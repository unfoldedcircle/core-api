// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Unfolded Circle ApS
// demo/main.js – sample page for the device API simulator.
// The page only uses the public interfaces. The demo always runs in a desktop browser, so it
// loads the shim and the simulator unconditionally. In a real page, load them only on request (see
// README.md).
import '../src/device-api-shim.js';
import '../src/device-api-simulator.js';

/** If set, suspend and resume are reported with sendBeacon (e.g. '/api/device-state'). */
const BEACON_URL = null;

const $ = id => document.getElementById(id);

// Feature detection: the device state API is only available in a web view with `device_api`.
if (!('deviceHost' in window)) {
  throw new Error('device state API not available');
}
const host = window.deviceHost;
const battery = await navigator.getBattery();

// ── Log ───────────────────────────────────────────────────────────────────
function log(msg) {
  const li = document.createElement('li');
  li.textContent = `${new Date().toLocaleTimeString()}  ${msg}`;
  $('log').prepend(li);
  while ($('log').children.length > 30) $('log').lastChild.remove();
}

function notifyServer(state) {
  const body = JSON.stringify({ state, ts: Date.now() });
  if (BEACON_URL) navigator.sendBeacon(BEACON_URL, body);
  log(`→ server: ${state}${BEACON_URL ? '' : ' (simulated, BEACON_URL not set)'}`);
}

// ── Battery ───────────────────────────────────────────────────────────────
function renderBattery() {
  const pct = Math.round(battery.level * 100);
  $('power-source').textContent = host.powerSource === 'ac' ? 'charger' : 'battery';
  $('battery-level').textContent = `${pct} %`;
  const bar = $('battery-bar');
  bar.style.width = `${pct}%`;
  bar.dataset.level = pct <= 15 ? 'low' : pct <= 40 ? 'mid' : 'high';
  $('low-battery').hidden = battery.charging || battery.level > 0.15;
}

battery.addEventListener('chargingchange', () => {
  log(`battery.chargingchange → ${battery.charging ? 'charging' : 'discharging'}`);
  renderBattery();
});
battery.addEventListener('levelchange', renderBattery);
host.addEventListener('on-ac', () => log('deviceHost.on-ac'));
host.addEventListener('on-battery', () => log('deviceHost.on-battery'));

// ── Display, visibility, animation ────────────────────────────────────────
function renderScreen() {
  $('screen').textContent = host.screen;
  $('visibility').textContent = document.visibilityState;

  const paused = document.visibilityState === 'hidden';
  const reduced = host.powerProfile === 'power-saver';
  $('spinner').classList.toggle('paused', paused);
  $('anim-state').textContent = paused ? 'paused' : reduced ? 'reduced (power-saver)' : 'running';
}

host.addEventListener('screenchange', e => {
  log(`deviceHost.screenchange → ${e.detail.state}`);
  renderScreen();
});
document.addEventListener('visibilitychange', () => {
  log(`document.visibilitychange → ${document.visibilityState}`);
  renderScreen();
});

// ── Power profile ─────────────────────────────────────────────────────────
function renderProfile() {
  $('profile').textContent = host.powerProfile;
}

host.addEventListener('powerprofilechange', e => {
  log(`deviceHost.powerprofilechange → ${e.detail.profile}`);
  renderProfile();
  renderScreen();
});

// ── Connection (simulates a WebSocket) ────────────────────────────────────
let reconnects = 0;
let timer = 0;

function setConnection(state) {
  $('connection').textContent = state;
  $('connection').dataset.state = state;
}

function reconnect() {
  clearTimeout(timer);
  setConnection('connecting …');
  timer = setTimeout(() => {
    if (!navigator.onLine) return setConnection('waiting for network …');
    reconnects += 1;
    $('reconnects').textContent = String(reconnects);
    setConnection('connected');
    log(`connection restored (#${reconnects})`);
  }, 300);
}

function renderOnline() {
  $('online').textContent = navigator.onLine ? 'online' : 'offline';
}

// Standby: report it as early as possible, the Remote doesn't wait for the page.
document.addEventListener('freeze', () => log('document.freeze'));
host.addEventListener('suspend', () => {
  log('deviceHost.suspend');
  notifyServer('suspend');
  clearTimeout(timer);
  setConnection('disconnected');
});

document.addEventListener('resume', () => log('document.resume'));
host.addEventListener('resume', e => {
  const minutes = Math.round(e.detail.sleptMs / 60_000);
  log(`deviceHost.resume, slept ${minutes} min`);
  $('slept').textContent = `${minutes} min`;
  if (navigator.onLine) {
    notifyServer('resume');
    reconnect();
  } else {
    setConnection('waiting for network …'); // reconnects with the online event
  }
});

window.addEventListener('offline', () => {
  log('window.offline');
  renderOnline();
  clearTimeout(timer);
  setConnection('disconnected');
});

window.addEventListener('online', () => {
  log('window.online');
  renderOnline();
  if ($('connection').dataset.state !== 'connected') {
    notifyServer('resume');
    reconnect();
  }
});

// ── Start: read the current state, don't wait for events ──────────────────
renderBattery();
renderScreen();
renderProfile();
renderOnline();
setConnection(navigator.onLine ? 'connected' : 'disconnected');
log(
  `start: ${host.powerSource}, ${Math.round(battery.level * 100)} %, ` +
    `display ${host.screen}, profile ${host.powerProfile}`,
);
