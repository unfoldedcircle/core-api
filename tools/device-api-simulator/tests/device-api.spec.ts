// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Unfolded Circle ApS
// tests/device-api.spec.ts
// Runs against the demo (index.html). Every test gets a fresh browser context, so the
// localStorage of the mock is empty.
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForFunction(() => !!window.deviceMock);
});

test('API shape: version 1, read-only state, no thermal state', async ({ page }) => {
  const shape = await page.evaluate(() => {
    const host = window.deviceHost!;
    try {
      (host as any).screen = 'off';
    } catch {}
    return {
      detected: 'deviceHost' in window,
      version: host.version,
      screen: host.screen,
      powerSource: host.powerSource,
      powerProfile: host.powerProfile,
      thermal: 'thermalState' in host,
      handler: 'onsuspend' in host,
      entryPointEnumerable: Object.keys(window).includes('__ucDeviceHostUpdate'),
      html: { ...document.documentElement.dataset },
    };
  });
  expect(shape).toEqual({
    detected: true,
    version: 1,
    screen: 'on',
    powerSource: 'ac',
    powerProfile: 'balanced',
    thermal: false,
    handler: false,
    entryPointEnumerable: false,
    html: { screen: 'on', powerProfile: 'balanced' },
  });
});

test('Battery: switch to the battery and warn at a low level', async ({ page }) => {
  await expect(page.getByTestId('power-source')).toHaveText('charger');
  await expect(page.getByTestId('low-battery')).toBeHidden();

  await page.evaluate(() => window.deviceMock!.set({ charging: false, level: 0.1 }));

  await expect(page.getByTestId('power-source')).toHaveText('battery');
  await expect(page.getByTestId('battery-level')).toHaveText('10 %');
  await expect(page.getByText('Battery low')).toBeVisible();

  const state = await page.evaluate(async () => {
    const b = await navigator.getBattery!();
    return {
      charging: b.charging,
      level: b.level,
      chargingTime: b.chargingTime,
      dischargingTime: b.dischargingTime,
      source: window.deviceHost!.powerSource,
    };
  });
  expect(state).toEqual({
    charging: false,
    level: 0.1,
    chargingTime: Infinity,
    dischargingTime: Infinity,
    source: 'battery',
  });
});

test('Battery: events, handlers and the times without estimates', async ({ page }) => {
  const seen = await page.evaluate(async () => {
    const seen: string[] = [];
    const b = await navigator.getBattery!();
    b.onlevelchange = () => seen.push(`onlevelchange ${b.level}`);
    b.addEventListener('chargingchange', () => seen.push(`chargingchange ${b.charging}`));
    b.addEventListener('chargingtimechange', () => seen.push('chargingtimechange'));
    b.addEventListener('dischargingtimechange', () => seen.push('dischargingtimechange'));
    window.deviceHost!.addEventListener('on-ac', () => seen.push('on-ac'));
    window.deviceHost!.addEventListener('on-battery', () => seen.push('on-battery'));

    await window.deviceMock!.set({ level: 1 });
    seen.push(`full on the charger: ${b.chargingTime}`);
    await window.deviceMock!.set({ charging: false });
    seen.push(`on the battery: ${b.chargingTime} ${b.dischargingTime}`);
    await window.deviceMock!.set({ charging: true, level: 0.5 });
    seen.push(`charging: ${b.chargingTime}`);
    return seen;
  });
  expect(seen).toEqual([
    'onlevelchange 1',
    'full on the charger: 0',
    'chargingchange false',
    'on-battery',
    'on the battery: Infinity Infinity',
    'chargingchange true',
    'on-ac',
    'onlevelchange 0.5',
    'charging: Infinity',
  ]);
});

test('Display dimmed: the page stays visible, the profile stays balanced', async ({ page }) => {
  await page.evaluate(() => window.deviceMock!.set({ screen: 'dim' }));

  await expect(page.getByTestId('screen')).toHaveText('dim');
  await expect(page.getByTestId('visibility')).toHaveText('visible');
  await expect(page.getByTestId('profile')).toHaveText('balanced');
  await expect(page.locator('html')).toHaveAttribute('data-screen', 'dim');
  await expect(page.locator('html')).toHaveAttribute('data-power-profile', 'balanced');
});

test('Display off: hidden, power-saver, a click on the overlay wakes up', async ({ page }) => {
  await page.evaluate(() => window.deviceMock!.set({ screen: 'off' }));

  await expect(page.getByTestId('screen')).toHaveText('off');
  await expect(page.getByTestId('visibility')).toHaveText('hidden');
  await expect(page.getByTestId('anim-state')).toHaveText('paused');
  await expect(page.getByTestId('profile')).toHaveText('power-saver');
  await expect(page.locator('html')).toHaveAttribute('data-screen', 'off');
  await expect(page.locator('html')).toHaveAttribute('data-power-profile', 'power-saver');
  expect(await page.evaluate(() => document.hidden)).toBe(true);
  const animation = await page.locator('#spinner').evaluate(el => getComputedStyle(el).animationName);
  expect(animation).toBe('none');

  // Playwright locators pierce an open shadow DOM
  await page.locator('device-api-simulator .overlay').click({ position: { x: 50, y: 50 } });

  await expect(page.getByTestId('screen')).toHaveText('on');
  await expect(page.getByTestId('visibility')).toHaveText('visible');
  await expect(page.getByTestId('anim-state')).toHaveText('running');
  await expect(page.getByTestId('profile')).toHaveText('balanced');
});

test('Standby: the connection is restored after the resume', async ({ page }) => {
  await expect(page.getByTestId('connection')).toHaveText('connected');
  await expect(page.getByTestId('reconnects')).toHaveText('0');

  const suspended = page.evaluate(() => window.deviceMock!.suspend(8));
  await expect(page.getByTestId('connection')).toHaveText('disconnected');
  await suspended;

  await expect(page.getByTestId('connection')).toHaveText('connected');
  await expect(page.getByTestId('reconnects')).toHaveText('1');
  await expect(page.getByTestId('online')).toHaveText('online');
  await expect(page.getByTestId('slept')).toHaveText('480 min');
  // 8 h on the charger: from 80 % to full
  await expect(page.getByTestId('battery-level')).toHaveText('100 %');
});

test('Standby: order of the events', async ({ page }) => {
  const events = await page.evaluate(async () => {
    const seen: string[] = [];
    const host = window.deviceHost!;
    host.addEventListener('screenchange', e => seen.push(`screenchange ${e.detail.state}`));
    host.addEventListener('powerprofilechange', e => seen.push(`powerprofilechange ${e.detail.profile}`));
    host.addEventListener('suspend', () => seen.push('suspend'));
    host.addEventListener('resume', e => seen.push(`resume ${e.detail.sleptMs}`));
    document.onfreeze = () => seen.push('document.freeze');
    document.onresume = () => seen.push('document.resume');
    document.addEventListener('visibilitychange', () => seen.push(document.visibilityState));
    window.addEventListener('offline', () => seen.push('offline'));
    window.addEventListener('online', () => seen.push('online'));
    await window.deviceMock!.suspend(1);
    return seen;
  });

  expect(events).toEqual([
    'screenchange off',
    'powerprofilechange power-saver',
    'document.freeze',
    'suspend',
    'hidden',
    'offline',
    'document.resume',
    'resume 3600000',
    'screenchange on',
    'powerprofilechange balanced',
    'visible',
    'online',
  ]);
});

test('Delivery: a change reaches the page in a task of its own, like on the Remote', async ({ page }) => {
  const seen = await page.evaluate(async () => {
    const seen: string[] = [];
    const host = window.deviceHost!;
    host.addEventListener('screenchange', e => seen.push(`screenchange ${e.detail.state} ${host.screen}`));
    document.addEventListener('visibilitychange', () => seen.push(document.visibilityState));
    const done = window.deviceMock!.set({ screen: 'off' });
    seen.push(`after the call: ${host.screen}`);
    await done;
    seen.push(`after the task: ${host.screen}`);
    return seen;
  });
  expect(seen).toEqual(['after the call: on', 'screenchange off off', 'hidden', 'after the task: off']);
});

test('Invalid values: ignored, like on the Remote', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const seen: string[] = [];
    const host = window.deviceHost!;
    host.addEventListener('screenchange', e => seen.push(`screenchange ${e.detail.state}`));
    host.addEventListener('powerprofilechange', e => seen.push(`powerprofilechange ${e.detail.profile}`));
    const update = (window as any).__ucDeviceHostUpdate;
    update({ screen: 'sleeping', powerProfile: 'turbo', powerSource: 'solar', level: 150 });
    update({ level: 0.5 });
    await update({ screen: 'dim' });
    const b = await navigator.getBattery!();
    return { seen, screen: host.screen, profile: host.powerProfile, source: host.powerSource, level: b.level };
  });
  expect(result).toEqual({
    seen: ['screenchange dim'],
    screen: 'dim',
    profile: 'balanced',
    source: 'ac',
    level: 0.8,
  });
});
