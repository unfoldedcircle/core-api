// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Unfolded Circle ApS
// device-api-simulator.js – for development in a desktop browser only. Never ship it with a page.
//
// Simulates the state of the Remote for the device state API: display, battery, power source
// and standby. Load device-api-shim.js first.
// Toggle the panel: Alt+Shift+D · console and tests: window.deviceMock
(() => {
  if (window.deviceMock) return;
  const update = window.__ucDeviceHostUpdate;
  const host = window.deviceHost;
  if (!update || !host) {
    console.warn('[device-api-simulator] load device-api-shim.js first');
    return;
  }

  // ── State, kept across reloads ────────────────────────────────────────────
  const KEY = 'device-api-simulator';
  const DEFAULTS = {
    charging: true, // on the charger: powerSource 'ac'
    level: 0.8, // battery level 0..1, in steps of 0.01
    screen: 'on', // 'on' | 'dim' | 'off'
    timelapse: false,
    fakeVisibility: true,
    offlineInStandby: true,
    standbyHours: 1,
    collapsed: false,
  };
  const s = (() => {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY)) || {};
      const known = Object.fromEntries(Object.entries(stored).filter(([k]) => k in DEFAULTS));
      return { ...DEFAULTS, ...known };
    } catch {
      return { ...DEFAULTS };
    }
  })();
  const save = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {}
  };
  let sleeping = false;

  // The power profile follows the display, like on the Remote: display off = power-saver.
  const profileOf = screen => (screen === 'off' ? 'power-saver' : 'balanced');
  const round2 = x => Math.round(Math.min(1, Math.max(0, x)) * 100) / 100;
  const deviceState = (screen = s.screen) => ({
    screen,
    powerSource: s.charging ? 'ac' : 'battery',
    powerProfile: profileOf(screen),
    level: Math.round(s.level * 100),
  });

  // Battery model of the standby simulation.
  const HOURS_TO_FULL = 2;
  const STANDBY_DRAIN_PER_HOUR = 0.01;

  // ── Fake Page Visibility (on the Remote, WebKit does this) ────────────────
  const visibilityGet = Object.getOwnPropertyDescriptor(Document.prototype, 'visibilityState').get;
  const hiddenGet = Object.getOwnPropertyDescriptor(Document.prototype, 'hidden').get;
  let forcedHidden = false;
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    get: () => (forcedHidden ? 'hidden' : visibilityGet.call(document)),
  });
  Object.defineProperty(document, 'hidden', {
    configurable: true,
    get: () => forcedHidden || hiddenGet.call(document),
  });
  function setForcedHidden(on) {
    on = on && s.fakeVisibility;
    if (on === forcedHidden) return;
    const before = document.visibilityState;
    forcedHidden = on;
    if (document.visibilityState !== before) {
      document.dispatchEvent(new Event('visibilitychange'));
    }
  }

  // ── Fake navigator.onLine (for the reconnect logic after a resume) ────────
  const onlineGet = Object.getOwnPropertyDescriptor(Navigator.prototype, 'onLine').get;
  let forcedOffline = false;
  Object.defineProperty(navigator, 'onLine', {
    configurable: true,
    get: () => !forcedOffline && onlineGet.call(navigator),
  });
  function setForcedOffline(on) {
    if (on === forcedOffline) return;
    forcedOffline = on;
    window.dispatchEvent(new Event(on ? 'offline' : 'online'));
  }

  // ── Panel (shadow DOM, so its CSS doesn't clash with the page) ────────────
  const root = document.createElement('device-api-simulator');
  const shadow = root.attachShadow({ mode: 'open' });
  shadow.innerHTML = `
<style>
  :host { all: initial; }
  .overlay { position: fixed; inset: 0; z-index: 2147483646; pointer-events: none; transition: background .3s; }
  .overlay.dim { background: rgba(0,0,0,.5); }
  .overlay.off, .overlay.sleep { background: #000; pointer-events: auto; cursor: pointer; }
  .overlay.off::after, .overlay.sleep::after {
    position: absolute; inset: 0; display: grid; place-items: center;
    color: #555; font: 14px system-ui, sans-serif; }
  .overlay.off::after   { content: 'Display off – click to wake up'; }
  .overlay.sleep::after { content: 'Standby …'; cursor: wait; }
  .panel { position: fixed; right: 12px; bottom: 12px; z-index: 2147483647; width: 270px;
    font: 12px/1.4 system-ui, sans-serif; color: #eee; background: #1e1e24f0;
    border-radius: 10px; box-shadow: 0 4px 20px #0008; }
  header { display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; }
  .collapsed .body { display: none; }
  .body { padding: 0 10px 10px; display: grid; gap: 6px; max-height: 70vh; overflow: auto; }
  fieldset { border: 1px solid #444; border-radius: 6px; padding: 4px 8px 6px; margin: 0; display: grid; gap: 4px; }
  legend { color: #9ab; padding: 0 4px; }
  label { display: flex; align-items: center; gap: 6px; }
  input[type=range] { flex: 1; }
  input[type=number] { width: 4em; }
  select, input, button { font: inherit; }
  button { background: #333; color: #eee; border: 1px solid #555; border-radius: 5px; padding: 3px 8px; cursor: pointer; }
  button:disabled { opacity: .5; cursor: default; }
  .seg { display: flex; }
  .seg button { flex: 1; border-radius: 0; }
  .seg button:first-child { border-radius: 5px 0 0 5px; }
  .seg button:last-child  { border-radius: 0 5px 5px 0; }
  .seg button.on { background: #2f6fde; border-color: #2f6fde; }
  .muted { color: #9ab; }
  .log { margin: 0; padding: 4px 6px; list-style: none; font: 11px ui-monospace, monospace;
    background: #0006; border-radius: 6px; max-height: 130px; overflow: auto; }
  .log:empty::before { content: 'No events yet'; color: #777; }
</style>
<div class="overlay"></div>
<div class="panel">
  <header><b>Device API simulator</b><button data-act="collapse" title="Alt+Shift+D">–</button></header>
  <div class="body">
    <fieldset><legend>Power</legend>
      <label><input type="checkbox" data-k="charging"> On the charger</label>
      <label>Battery <input type="range" min="0" max="100" data-k="level"> <output data-o="level"></output></label>
      <label><input type="checkbox" data-k="timelapse"> Battery time-lapse</label>
    </fieldset>
    <fieldset><legend>Display</legend>
      <div class="seg" data-seg="screen">
        <button value="on">On</button><button value="dim">Dimmed</button><button value="off">Off</button>
      </div>
      <span class="muted">Power profile: <output data-o="profile"></output></span>
    </fieldset>
    <fieldset><legend>Standby</legend>
      <label>Duration <input type="number" min="0" step="0.5" data-k="standbyHours"> h</label>
      <label><input type="checkbox" data-k="offlineInStandby"> Disconnect the network in standby</label>
      <button data-act="suspend">Simulate standby</button>
    </fieldset>
    <label><input type="checkbox" data-k="fakeVisibility"> Fake page visibility</label>
    <ol class="log"></ol>
    <button data-act="reset">Reset</button>
  </div>
</div>`;

  const $ = selector => shadow.querySelector(selector);
  const logEl = $('.log');

  function render() {
    shadow.querySelectorAll('[data-k]').forEach(el => {
      const value = s[el.dataset.k];
      if (el.type === 'checkbox') el.checked = value;
      else if (el.type === 'range') el.value = Math.round(value * 100);
      else if (shadow.activeElement !== el) el.value = value; // don't overwrite while typing
    });
    $('[data-o=level]').textContent = `${Math.round(s.level * 100)} %`;
    $('[data-o=profile]').textContent = profileOf(sleeping ? 'off' : s.screen);
    shadow.querySelectorAll('[data-seg] button').forEach(b =>
      b.classList.toggle('on', s[b.parentElement.dataset.seg] === b.value),
    );
    $('.overlay').className = 'overlay ' + (sleeping ? 'sleep' : s.screen);
    $('.panel').classList.toggle('collapsed', s.collapsed);
    $('[data-act=suspend]').disabled = sleeping;
  }

  // ── Hand the state to the shim, like the Remote does ──────────────────────
  // Resolves once the page has seen the change.
  function push() {
    save();
    render();
    if (sleeping) return Promise.resolve();
    // The shim delivers the change in a task of its own, like the Remote; the page is hidden or
    // shown after the events, as WebKit does on the Remote.
    const hidden = s.screen === 'off';
    return update(deviceState()).then(() => setForcedHidden(hidden));
  }

  function set(patch) {
    Object.assign(s, patch);
    s.level = round2(s.level);
    return push();
  }

  // ── Standby: the same order of events as on the Remote ────────────────────
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  async function suspend(hours = s.standbyHours) {
    if (sleeping) return;
    // 1. Standby, in one change like on the Remote: screenchange and powerprofilechange (display
    //    off), freeze on document, suspend on deviceHost. The Remote doesn't wait for the page.
    sleeping = true;
    const suspended = update({ event: 'suspend', ...deviceState('off') });
    render();
    // 2. Then the page is hidden (it is already hidden if the display was off before).
    await suspended;
    setForcedHidden(true);
    await wait(300);
    if (s.offlineInStandby) setForcedOffline(true);
    // 3. "Sleep": the duration is only simulated, Date.now() doesn't jump.
    await wait(1500);
    s.level = round2(
      s.charging ? s.level + hours / HOURS_TO_FULL : s.level - hours * STANDBY_DRAIN_PER_HOUR,
    );
    // 4. Wake-up: resume with the time slept, then the current state, the page is visible again.
    sleeping = false;
    s.screen = 'on';
    const resumed = update({ event: 'resume', sleptMs: Math.round(hours * 3_600_000), ...deviceState() });
    save();
    render();
    await resumed;
    setForcedHidden(false);
    // 5. The network connection comes back later.
    if (s.offlineInStandby) {
      await wait(1000);
      setForcedOffline(false);
    }
  }

  function reset() {
    Object.assign(s, DEFAULTS);
    logEl.replaceChildren();
    return push();
  }

  // ── Input ─────────────────────────────────────────────────────────────────
  shadow.addEventListener('input', e => {
    const t = e.target;
    const k = t.dataset.k;
    if (!k) return;
    const value =
      t.type === 'checkbox' ? t.checked
      : t.type === 'range' ? +t.value / 100
      : t.type === 'number' ? Math.max(0, +t.value || 0)
      : t.value;
    set({ [k]: value });
  });

  shadow.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b || b.disabled) return;
    const seg = b.parentElement.dataset.seg;
    if (seg) return set({ [seg]: b.value });
    ({
      suspend: () => suspend(),
      reset,
      collapse: () => set({ collapsed: !s.collapsed }),
    })[b.dataset.act]?.();
  });

  $('.overlay').addEventListener('click', () => {
    if (!sleeping && s.screen === 'off') set({ screen: 'on' });
  });

  window.addEventListener(
    'keydown',
    e => {
      if (e.altKey && e.shiftKey && e.code === 'KeyD') {
        e.preventDefault();
        set({ collapsed: !s.collapsed });
      }
    },
    true,
  );

  // ── Battery time-lapse ────────────────────────────────────────────────────
  setInterval(() => {
    if (!s.timelapse || sleeping) return;
    const next = round2(s.level + (s.charging ? 0.02 : -0.01));
    if (next !== s.level) set({ level: next });
  }, 1000);

  // ── Event log: what the page sees ─────────────────────────────────────────
  function log(source, type, detail) {
    const li = document.createElement('li');
    const d = detail === undefined ? '' : ' ' + JSON.stringify(detail);
    li.textContent = `${new Date().toLocaleTimeString()} ${source}.${type}${d}`;
    logEl.prepend(li);
    while (logEl.children.length > 15) logEl.lastChild.remove();
  }
  ['suspend', 'resume', 'on-ac', 'on-battery', 'screenchange', 'powerprofilechange'].forEach(type =>
    host.addEventListener(type, e => log('deviceHost', type, e.detail ?? undefined)),
  );
  ['freeze', 'resume'].forEach(type => document.addEventListener(type, () => log('document', type)));
  navigator.getBattery().then(b => {
    b.addEventListener('chargingchange', () => log('battery', 'chargingchange', b.charging));
    b.addEventListener('levelchange', () => log('battery', 'levelchange', b.level));
  });
  document.addEventListener('visibilitychange', () =>
    log('document', 'visibilitychange', document.visibilityState),
  );
  window.addEventListener('online', () => log('window', 'online'));
  window.addEventListener('offline', () => log('window', 'offline'));

  // ── Console and test API ──────────────────────────────────────────────────
  Object.defineProperty(window, 'deviceMock', {
    configurable: true,
    value: Object.freeze({
      get state() {
        return { ...s, powerProfile: profileOf(sleeping ? 'off' : s.screen), sleeping };
      },
      set,
      suspend,
      reset,
      show: () => set({ collapsed: false }),
      hide: () => set({ collapsed: true }),
    }),
  });

  // ── Start: apply the state right away, mount the panel once the body exists ─
  push();
  const mount = () => document.body.appendChild(root);
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount, { once: true });
  console.info('[device-api-simulator] active – Alt+Shift+D shows or hides the panel');
})();
