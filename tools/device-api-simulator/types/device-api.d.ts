// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Unfolded Circle ApS
// device-api.d.ts
// Types of the device state API of the Unfolded Circle Remote for web pages, API version 1.
// See doc/entities/entity_webview.md#device-state-for-web-pages in the core-api repository.

export {};

declare global {
  // ── State values ──────────────────────────────────────────────────────────

  /** State of the display of the Remote. */
  type DeviceScreenState = 'on' | 'dim' | 'off';
  /** Power source of the Remote (names of the Electron powerMonitor). */
  type DevicePowerSource = 'ac' | 'battery';
  /** Power profile (names of the Linux power-profiles-daemon). */
  type DevicePowerProfile = 'power-saver' | 'balanced' | 'performance';

  // ── navigator.getBattery(): stand-in for the W3C Battery Status API ───────

  interface BatteryManagerEventMap {
    chargingchange: Event;
    levelchange: Event;
    /** Never fired by the Remote. */
    chargingtimechange: Event;
    /** Never fired by the Remote. */
    dischargingtimechange: Event;
  }

  interface BatteryManager extends EventTarget {
    /** true while the Remote is connected to power, also with a full battery. */
    readonly charging: boolean;
    /** Battery level from 0.0 to 1.0, in steps of 0.01. */
    readonly level: number;
    /** 0 while connected to power with a full battery, otherwise Infinity: no estimates. */
    readonly chargingTime: number;
    /** Always Infinity: no estimates. */
    readonly dischargingTime: number;

    onchargingchange: ((this: BatteryManager, ev: Event) => any) | null;
    onlevelchange: ((this: BatteryManager, ev: Event) => any) | null;
    onchargingtimechange: ((this: BatteryManager, ev: Event) => any) | null;
    ondischargingtimechange: ((this: BatteryManager, ev: Event) => any) | null;

    addEventListener<K extends keyof BatteryManagerEventMap>(
      type: K,
      listener: (this: BatteryManager, ev: BatteryManagerEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions,
    ): void;
    addEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions,
    ): void;
    removeEventListener<K extends keyof BatteryManagerEventMap>(
      type: K,
      listener: (this: BatteryManager, ev: BatteryManagerEventMap[K]) => any,
      options?: boolean | EventListenerOptions,
    ): void;
    removeEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | EventListenerOptions,
    ): void;
  }

  interface Navigator {
    /** Only in a web view with the device state API, missing in Safari and Firefox. */
    getBattery?(): Promise<BatteryManager>;
  }

  // ── document: freeze and resume (Page Lifecycle event names) ──────────────

  interface DocumentEventMap {
    /** The Remote goes into standby. Best effort: the handler may not run before it sleeps. */
    freeze: Event;
    /** The Remote woke up from standby. */
    resume: Event;
  }

  interface Document {
    onfreeze: ((this: Document, ev: Event) => any) | null;
    onresume: ((this: Document, ev: Event) => any) | null;
  }

  // ── window.deviceHost ─────────────────────────────────────────────────────

  interface DeviceResumeDetail {
    /** Time in standby in milliseconds. */
    sleptMs: number;
  }
  interface DeviceScreenChangeDetail {
    state: DeviceScreenState;
  }
  interface DevicePowerProfileChangeDetail {
    profile: DevicePowerProfile;
  }

  interface DeviceHostEventMap {
    /** The Remote goes into standby. Best effort: the handler may not run before it sleeps. */
    suspend: Event;
    /** The Remote woke up from standby. The network may not be ready yet. */
    resume: CustomEvent<DeviceResumeDetail>;
    /** The Remote is connected to power. */
    'on-ac': Event;
    /** The Remote runs on its battery. */
    'on-battery': Event;
    /** The display state changed. */
    screenchange: CustomEvent<DeviceScreenChangeDetail>;
    /** The power profile changed. */
    powerprofilechange: CustomEvent<DevicePowerProfileChangeDetail>;
  }

  interface DeviceHost extends EventTarget {
    /** API version. Increased with incompatible changes. */
    readonly version: 1;
    /** Current state, readable at any time, also before the first event. */
    readonly screen: DeviceScreenState;
    readonly powerSource: DevicePowerSource;
    readonly powerProfile: DevicePowerProfile;

    addEventListener<K extends keyof DeviceHostEventMap>(
      type: K,
      listener: (this: DeviceHost, ev: DeviceHostEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions,
    ): void;
    addEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions,
    ): void;
    removeEventListener<K extends keyof DeviceHostEventMap>(
      type: K,
      listener: (this: DeviceHost, ev: DeviceHostEventMap[K]) => any,
      options?: boolean | EventListenerOptions,
    ): void;
    removeEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | EventListenerOptions,
    ): void;
  }

  // ── Desktop simulator (development only) ───────────────────────────────────────

  interface DeviceMockState {
    /** On the charger: powerSource 'ac'. */
    charging: boolean;
    /** Battery level 0.0 to 1.0. */
    level: number;
    screen: DeviceScreenState;
    timelapse: boolean;
    fakeVisibility: boolean;
    offlineInStandby: boolean;
    standbyHours: number;
    collapsed: boolean;
  }

  interface DeviceMock {
    readonly state: Readonly<DeviceMockState & { powerProfile: DevicePowerProfile; sleeping: boolean }>;
    /** Changes the simulated state. Resolves once the page has seen the change (the events run in a task of their own). */
    set(patch: Partial<DeviceMockState>): Promise<void>;
    /** Simulates a standby: display off, freeze and suspend → hidden → offline → resume → visible → online. */
    suspend(hours?: number): Promise<void>;
    reset(): Promise<void>;
    show(): Promise<void>;
    hide(): Promise<void>;
  }

  interface Window {
    /** Only in a web view with the device state API, or with the device API simulator. Check first. */
    readonly deviceHost?: DeviceHost;
    /** Only with the device API simulator. */
    readonly deviceMock?: DeviceMock;
  }

  /** Set on <html data-screen="…" data-power-profile="…"> for CSS selectors. */
  interface DOMStringMap {
    screen?: DeviceScreenState;
    powerProfile?: DevicePowerProfile;
  }
}
