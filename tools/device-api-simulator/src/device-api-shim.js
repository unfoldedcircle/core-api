// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Unfolded Circle ApS
// device-api-shim.js
//
// Device state API of the Unfolded Circle Remote for web pages, API version 1, as described in
// doc/entities/entity_webview.md#device-state-for-web-pages:
// - navigator.getBattery(): a stand-in for the W3C Battery Status API
// - `freeze` and `resume` events on `document`, like the Page Lifecycle API
// - window.deviceHost: display state, power source and power profile, standby events
// - <html data-screen="…" data-power-profile="…"> for CSS
//
// This file behaves like the script which the Remote injects into the pages of a web view with
// the `device_api` option. On a desktop computer, device-api-simulator.js changes the state through
// the internal entry point `__ucDeviceHostUpdate`, which exists only in the simulator: on the Remote,
// the state is delivered outside the page. Web pages must never call it.
(() => {
  if (Object.prototype.hasOwnProperty.call(window, '__ucDeviceHostUpdate')) return;

  // Initial state. The Remote injects the script with its current state, the simulator starts with
  // the display on and the Remote on its charger with a full battery.
  const state = {
    screen: 'on', // 'on' | 'dim' | 'off'
    powerSource: 'ac', // 'ac' | 'battery'
    powerProfile: 'balanced', // 'power-saver' | 'balanced' | 'performance'
    level: 100, // battery level in percent, 0..100
  };

  // Event handler attributes (`onlevelchange`, `document.onfreeze`, …) with the order of the
  // HTML specification: the handler is a listener which is registered when it is set first.
  const defineHandler = (target, type) => {
    let handler = null;
    let registered = false;
    Object.defineProperty(target, 'on' + type, {
      configurable: true,
      enumerable: true,
      get: () => handler,
      set: value => {
        handler = typeof value === 'function' ? value : null;
        if (handler && !registered) {
          registered = true;
          target.addEventListener(type, function (event) {
            if (handler) return handler.call(this, event);
          });
        }
      },
    });
  };

  // ── navigator.getBattery() ────────────────────────────────────────────────
  // The Remote has no charging and discharging time estimates: chargingTime and dischargingTime
  // have the default values of the specification.
  class BatteryManager extends EventTarget {
    get charging() {
      return state.powerSource === 'ac';
    }
    get level() {
      return state.level / 100;
    }
    get chargingTime() {
      return this.charging && state.level >= 100 ? 0 : Infinity;
    }
    get dischargingTime() {
      return Infinity;
    }
  }
  const battery = new BatteryManager();
  for (const type of ['chargingchange', 'levelchange', 'chargingtimechange', 'dischargingtimechange']) {
    defineHandler(battery, type);
  }
  // Always defined: a desktop Chromium has its own Battery Status API, which would hide the simulator's.
  Object.defineProperty(navigator, 'getBattery', {
    configurable: true,
    writable: true,
    value: function getBattery() {
      return Promise.resolve(battery);
    },
  });

  // ── document: freeze and resume ───────────────────────────────────────────
  defineHandler(document, 'freeze');
  defineHandler(document, 'resume');

  // ── window.deviceHost ─────────────────────────────────────────────────────
  // Events only through addEventListener: suspend, resume, on-ac, on-battery, screenchange,
  // powerprofilechange.
  class DeviceHost extends EventTarget {
    get version() {
      return 1;
    }
    get screen() {
      return state.screen;
    }
    get powerSource() {
      return state.powerSource;
    }
    get powerProfile() {
      return state.powerProfile;
    }
  }
  const host = new DeviceHost();
  Object.defineProperty(window, 'deviceHost', { configurable: true, enumerable: true, value: host });

  // ── data attributes for CSS ───────────────────────────────────────────────
  const applyAttributes = () => {
    const root = document.documentElement;
    if (!root) {
      document.addEventListener('DOMContentLoaded', applyAttributes, { once: true });
      return;
    }
    root.dataset.screen = state.screen;
    root.dataset.powerProfile = state.powerProfile;
  };
  applyAttributes();

  // Only valid values are taken over, like on the Remote: an unknown value leaves the state as it is.
  const VALID = {
    screen: ['on', 'dim', 'off'],
    powerSource: ['ac', 'battery'],
    powerProfile: ['power-saver', 'balanced', 'performance'],
  };
  const validated = change => {
    const out = {};
    for (const key of Object.keys(VALID)) {
      if (VALID[key].includes(change[key])) out[key] = change[key];
    }
    if (Number.isInteger(change.level) && change.level >= 0 && change.level <= 100) out.level = change.level;
    return out;
  };

  const fire = (target, type, detail) =>
    target.dispatchEvent(detail === undefined ? new Event(type) : new CustomEvent(type, { detail }));

  // Apply a state change. All values change first, then the events are fired, only for values
  // which really changed.
  const applyState = change => {
    const previous = { ...state };
    Object.assign(state, validated(change));
    applyAttributes();
    if (previous.powerSource !== state.powerSource) {
      fire(battery, 'chargingchange');
      fire(host, state.powerSource === 'ac' ? 'on-ac' : 'on-battery');
    }
    if (previous.level !== state.level) fire(battery, 'levelchange');
    if (previous.screen !== state.screen) fire(host, 'screenchange', { state: state.screen });
    if (previous.powerProfile !== state.powerProfile) {
      fire(host, 'powerprofilechange', { profile: state.powerProfile });
    }
  };

  // A state change, or a standby event:
  // - { screen?, powerSource?, powerProfile?, level? }: state change, level in percent.
  // - { event: 'suspend', … }: the state change first, then `freeze` on document and `suspend`
  //   on deviceHost.
  // - { event: 'resume', sleptMs, … }: `resume` on document and on deviceHost first, then the
  //   state change.
  const apply = change => {
    if (change.event === 'resume') {
      fire(document, 'resume');
      fire(host, 'resume', { sleptMs: Math.max(0, Number(change.sleptMs) || 0) });
    }
    applyState(change);
    if (change.event === 'suspend') {
      fire(document, 'freeze');
      fire(host, 'suspend');
    }
  };

  // Like on the Remote, a change reaches the page in a task of its own: the state changes and the
  // event handlers run after the call to the entry point has returned.
  // In the shim of the simulator, the entry point also returns a promise which resolves once the page
  // has seen the change.
  const channel = new MessageChannel();
  const delivered = [];
  channel.port1.onmessage = event => {
    try {
      apply(event.data);
    } finally {
      delivered.shift()();
    }
  };
  const update = (change = {}) => {
    if (change === null || typeof change !== 'object') return Promise.resolve();
    return new Promise(resolve => {
      delivered.push(resolve);
      channel.port2.postMessage(change);
    });
  };
  Object.defineProperty(window, '__ucDeviceHostUpdate', { configurable: false, enumerable: false, value: update });
})();
