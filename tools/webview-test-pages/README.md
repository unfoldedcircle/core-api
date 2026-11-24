# Web view test pages

Test pages for developers of pages for a [web view](../../doc/entities/entity_webview.md) of the Unfolded Circle
Remote. Open them in a web view on the Remote to see what a page receives from the Remote.

| Page                                 | Shows                                                                                                                                                                                                                                                                             |
|--------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [key-input.html](key-input.html)     | The key events of the buttons of the Remote: `key`, `code`, `keyCode` and the modifiers of the last key, the [keys](../../doc/entities/entity_webview.md#buttons) of the Remote that arrived with the expected values, focus and text input, and a log of every key event.            |
| [device-api.html](device-api.html)   | The [device state API](../../doc/entities/entity_webview.md#device-state-for-web-pages): `window.deviceHost`, `navigator.getBattery()`, the `data-screen` and `data-power-profile` attributes, Page Visibility, the network state, the timer rate of hidden pages, and a log of every event. |
| [index.html](index.html)             | Links to both pages.                                                                                                                                                                                                                                                              |

Each page is a single HTML file without external resources. It loads nothing from other servers and sends nothing.

## Use on the Remote

The pages are published with the API documentation:

- <https://unfoldedcircle.github.io/core-api/tools/webview-test-pages/>
- <https://unfoldedcircle.github.io/core-api/tools/webview-test-pages/key-input.html>
- <https://unfoldedcircle.github.io/core-api/tools/webview-test-pages/device-api.html>

Create a web view with one of these addresses in the web configurator, or serve the files from your own web server,
e.g. to test without internet access:

```bash
cd tools
python3 -m http.server 8000
# web view address: http://<computer>:8000/webview-test-pages/device-api.html
```

Serve the `tools` directory, not only `webview-test-pages`: the device state page loads the simulator from
`../device-api-simulator/src/` in a desktop browser.

### Key input

- By default, only the D-pad, OK and MENU send keys to the page, and BACK closes the web view. To test all keys, set
  the buttons of the web view to the `page_keys` [preset](../../doc/entities/entity_webview.md#button-presets), or set
  single buttons to "Send key".
- A key name turns green when its `code` and `keyCode` are the values of the Remote, red when they differ. The
  expected values are those of firmware 2.14.0 and newer.
- The page calls `preventDefault()` for the arrow, page and space keys, so the page doesn't scroll. Clear the checkbox
  to see the default behavior.

### Device state

- Enable the `device_api` option of the web view; for a web view of an integration, the user override
  `options.user.device_api`. Without it, the page shows that the API is not available and only logs Page Visibility,
  focus, the network state and the timers.
- To see all events: dim the display, let it turn off, put the Remote into standby and wake it up, and connect and
  disconnect the charger.
- The timer row shows how often a 100 ms `setInterval` runs: about once per second while the page is hidden. A long
  gap in the timer is logged with the time `Date.now()` jumped ahead of `performance.now()`, i.e. the time in
  standby.
- The events are only delivered while the page is loaded: in the fullscreen web view while it is open, or in the
  widget of the shown activity page. Keep the web view open to see the standby events.

## Use in a desktop browser

Both pages work in a desktop browser. The key values of a keyboard differ from those of the Remote for some keys.

The device state page loads the [device API simulator](../device-api-simulator) with **Load simulator** or with
`?simulator` in the address, e.g. `http://localhost:8000/webview-test-pages/device-api.html?simulator`. Change the
simulated state in the simulator's panel (Alt+Shift+D).
