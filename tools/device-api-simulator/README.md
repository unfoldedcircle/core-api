# Device API simulator

Desktop simulator of the [device state API for web pages](../../doc/entities/entity_webview.md#device-state-for-web-pages)
of the Unfolded Circle Remote. It simulates the display, the battery, the power source and the standby of the Remote in
a regular desktop browser, to develop and test a page for a web view with the `device_api` option without a Remote.

- `src/device-api-shim.js` provides the API like the Remote does in a web view with the `device_api` option:
  `navigator.getBattery()`, `freeze` and `resume` on `document`, `window.deviceHost`, and the `data-screen` and
  `data-power-profile` attributes on `<html>`.
- `src/device-api-simulator.js` adds a control panel and `window.deviceMock` to change the simulated state.
- `types/device-api.d.ts` has the TypeScript types of the API and of `window.deviceMock`.

## Quick start

Requires Node.js 18 or newer.

```bash
npm install
npm run test:install   # Playwright browsers (Chromium and WebKit), once
npm run dev            # demo page at http://localhost:5173
```

| Command             | Purpose                                      |
|---------------------|----------------------------------------------|
| `npm run dev`       | Demo page with the simulator's panel (Vite)  |
| `npm run typecheck` | TypeScript check of the tests and the types  |
| `npm test`          | Playwright tests in Chromium and WebKit      |

Show or hide the panel: **Alt+Shift+D**.

## Structure

```
device-api-simulator/
├── src/
│   ├── device-api-shim.js        # the API, as provided by the Remote
│   └── device-api-simulator.js   # control panel and window.deviceMock, development only
├── types/
│   └── device-api.d.ts           # types of the API and of window.deviceMock
├── demo/
│   ├── main.js                   # sample page which uses all events
│   └── demo.css
├── tests/
│   └── device-api.spec.ts        # Playwright tests
├── index.html
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Using the simulator in your own page

On the Remote, the API is available before the scripts of the page run. Don't ship the shim or the simulator with the
page: in a web view without the `device_api` option, and in a regular browser, the page must work without the API.

Load the simulator explicitly during development, e.g. with a query parameter, instead of loading it whenever
`deviceHost` is missing:

```ts
// main.ts
const wantSimulator = import.meta.env.DEV
  && new URLSearchParams(location.search).has('devicesim');

if (wantSimulator) {
  await import('./device/device-api-shim.js');
  await import('./device/device-api-simulator.js');
}
```

Open `http://localhost:5173/?devicesim`. The simulator is not part of a production build.

**Without a build tool:** create both files as snippets in the developer tools of Chrome under *Sources → Snippets* and
run them one after the other: the shim first, then the simulator.

**Types:** add `types/device-api.d.ts` to your `tsconfig.json`:

```json
{ "include": ["src", "types/device-api.d.ts"] }
```

## API

See [device state for web pages](../../doc/entities/entity_webview.md#device-state-for-web-pages) for the complete
description.

### `navigator.getBattery()`

| Property          | Type      | Value                                                                   |
|-------------------|-----------|-------------------------------------------------------------------------|
| `charging`        | `boolean` | `true` while the Remote is connected to power, also with a full battery |
| `level`           | `number`  | 0.0 to 1.0, in steps of 0.01                                            |
| `chargingTime`    | `number`  | `0` while connected to power with a full battery, otherwise `Infinity`  |
| `dischargingTime` | `number`  | always `Infinity`                                                       |

Events: `chargingchange` and `levelchange`, also as `on…` handlers. `chargingtimechange` and `dischargingtimechange`
exist, but are never fired.

### `document`

| Event    | Handler             | Fired                            |
|----------|---------------------|----------------------------------|
| `freeze` | `document.onfreeze` | The Remote goes into standby.    |
| `resume` | `document.onresume` | The Remote woke up from standby. |

### `window.deviceHost`

| Property       | Values                                             |
|----------------|----------------------------------------------------|
| `version`      | `1`                                                |
| `screen`       | `'on'` \| `'dim'` \| `'off'`                       |
| `powerSource`  | `'ac'` \| `'battery'`                              |
| `powerProfile` | `'power-saver'` \| `'balanced'` \| `'performance'` |

| Event                  | `detail`      |
|------------------------|---------------|
| `suspend`              | –             |
| `resume`               | `{ sleptMs }` |
| `on-ac` / `on-battery` | –             |
| `screenchange`         | `{ state }`   |
| `powerprofilechange`   | `{ profile }` |

Only with `addEventListener`, there are no `on…` handlers.

## Behaviour, as on the Remote

- **A change arrives in a task of its own.** The state changes and the event handlers run after the change was sent,
  not inside the call that sent it. When a handler runs, every property and attribute already has the new value.
- **Order of the events of one change:** `chargingchange` and `on-ac` / `on-battery`, `levelchange`, `screenchange`,
  `powerprofilechange`. Events are fired only for values that really changed.
- **The power profile follows the display:** `power-saver` while the display is off, otherwise `balanced`.
- **Display off:** `screenchange` and `powerprofilechange` first, then the page is hidden (`visibilitychange`). A dimmed
  display doesn't hide the page.
- **Standby:** `screenchange` and `powerprofilechange` (if the display was still on), `freeze` on `document`,
  `suspend` on `deviceHost`, then the page is hidden and goes offline. The Remote doesn't wait for the page.
- **Wake-up:** `resume` on `document`, `resume` on `deviceHost` with `sleptMs`, then the current state (`screenchange`,
  `powerprofilechange`, battery events), then the page is visible. The network comes back later.
- **Invalid values are ignored**, the state keeps its value.

### `window.deviceMock` (simulator only)

| Member              | Purpose                                                                                     |
|---------------------|---------------------------------------------------------------------------------------------|
| `state`             | Current simulated state, with the derived `powerProfile` and `sleeping`                     |
| `set(patch)`        | Change the state, e.g. `set({ charging: false, level: 0.1 })` or `set({ screen: 'dim' })`   |
| `suspend(hours?)`   | Simulate a standby and the wake-up, in the order above                                      |
| `reset()`           | Restore the defaults and clear the log                                                      |
| `show()` / `hide()` | Expand or collapse the panel                                                                |

All methods return a promise which resolves once the page has seen the change. In a test, `await` it before checking
the page:

```ts
await page.evaluate(() => window.deviceMock!.set({ screen: 'off' }));
```

The state is kept across reloads in `localStorage` (`device-api-simulator`). In tests, start with `reset()` or use a
fresh browser context.

## Limitations of the simulator

1. **No real throttling:** the faked visibility doesn't throttle timers, CSS animations or `requestAnimationFrame`. This
   only happens on the Remote, or with a real tab switch.
2. **`offline` is only a signal:** `fetch` and WebSockets keep working. For a real offline state, also select
   *Network → Offline* in the developer tools.
3. **Real tab switches** still fire real `visibilitychange` events.
4. **The standby duration is simulated:** `Date.now()` doesn't jump. Only `sleptMs` of the `resume` event reports the
   simulated time.
5. **Chromium and WebKit vs. the Remote:** the WebKit engine of Playwright is closer to the web view of the Remote than
   Chromium, but it doesn't replace a test on the Remote.

## License

The device API simulator is licensed under the [MIT License](./LICENSE), unlike the rest of this repository.
