# Web View Entity

> [!NOTE]
> The web view entity is supported in Remote firmware 2.14.0 and newer.

<!-- TOC -->
- [Availability](#availability)
- [Not supported](#not-supported)
- [Features](#features)
  - [Attributes](#attributes)
  - [States](#states)
  - [Device Classes](#device-classes)
  - [Options](#options)
  - [Secret options](#secret-options)
  - [User overrides](#user-overrides)
- [Global web view settings](#global-web-view-settings)
- [User interface](#user-interface)
- [Commands](#commands)
- [Core-API](#core-api)
- [Integration API](#integration-api)
<!-- TOC -->

---

A web view entity shows a web page on the Remote, for example the dashboard of a home automation system, a monitoring
website or the status page of a device.

Web view entities are either provided by an integration driver, e.g. a pre-configured dashboard of the integrated
system, or defined by the user in the web-configurator. Both kinds use the same options.

- On a profile page the entity is shown as a tile. Tapping the tile opens the web page in a fullscreen web view. See
  [profile page tile](#profile-page-tile).
- In an activity user interface, the [web view widget](../ui-widgets.md#web-view) shows the web page in the page grid.
  An activity can contain at most one web view widget, with a minimum size of 3 × 3 grid fields.
- The [commands](#commands) of a web view entity work like the commands of other entities: in activity sequences,
  macros, button mappings, activity user interface items and from other systems with the Core-API, e.g. to open a
  dashboard with a button.

The web page is rendered by the user interface of the Remote. The integration driver only provides the entity
definition: the page is loaded directly from its web server, and the driver doesn't receive any commands for a web view
entity.

> [!NOTE]
> **Intended use: lightweight pages made for the Remote.**
> The web view is not a replacement for a web browser. It is intended for simple, lightweight pages that are tailored
> to the Remote, e.g. a custom dashboard, a status or control page of a device, or a page made by an integration for
> the Remote.
>
> - Design the page for the small portrait touch screen of the Remote: large touch targets, no hover effects, no
>   horizontal scrolling.
> - Keep it light: little JavaScript, few and small images, no ads or trackers. Prefer pages that are rendered on the
>   server over large single-page applications.
> - Update the page in reasonable intervals instead of polling or animating continuously.
>
> Memory, processing power and battery of the Remote are limited. Resource-intensive websites with heavy JavaScript
> frameworks, large media or many animations load slowly, react sluggishly, drain the battery and may be reloaded or
> stopped when the Remote runs low on memory. There is no address bar, no tabs, and only one web page is shown at a
> time. See [not supported](#not-supported) for the features the web view doesn't offer.

## Availability

A web view entity requires a Remote whose user interface can show web views. Not every user interface has a web view.

- The Core reports a web view entity as `UNAVAILABLE` while no user interface that executes web view commands is
  connected. See [states](#states).
- A Remote firmware which supports web view entities lists the `webview` entity type in the supported entity types
  (Integration-API `get_supported_entity_types`, WS Core-API `get_entity_types`).

> [!WARNING]
> **Integration drivers must check the supported entity types before providing web view entities.**
> A Remote with an older firmware doesn't know the `webview` entity type and rejects the complete `available_entities`
> response if it contains a web view entity: none of the driver's entities can then be configured.
>
> Only include web view entities in `available_entities` if the `supported_entity_types` response of the
> `get_supported_entity_types` request contains `webview`.

## Not supported

The following features are not supported by the web view of the Remote.

Media:
- Audio and video: no playback of `audio` and `video` elements, Web Audio, streaming media (Media Source Extensions)
  and WebCodecs. This includes video streams, e.g. of cameras, and autoplay.
- WebRTC, and access to the camera and the microphone.

Permissions:
- Location, notifications, camera and microphone: permission requests of a page are denied.

Content and navigation:
- Downloads: files are not saved.
- PDF documents are not shown.
- Only `http` and `https` pages are loaded. Links with other schemes, e.g. `mailto:`, `tel:` or `file:`, are not
  opened.
- Pop-up windows: a link or a script which opens a new window opens the page in the same web view.
- The fullscreen mode of a page (Fullscreen API).
- Several pages at the same time: there are no tabs, and an activity contains at most one web view widget.
- Browser extensions and plugins, e.g. ad blockers.

Logins and security:
- Client certificates (mutual TLS).
- Saving passwords and filling in forms automatically.

Input:
- Pinch-to-zoom might not be available on all Remote models. Use the `zoom` option, or the `zoom_in` and `zoom_out`
  button functions, to scale a page.

## Features

The web view entity has no features.

### Attributes

| Attribute | Type | Values            | Description                         |
|-----------|------|-------------------|-------------------------------------|
| state     | enum | [States](#states) | Optional state of the web view.     |

The URL and the title of the currently shown page are not entity attributes. They change with every navigation, can
contain tokens in the query string and are only of interest to the user interface which shows the page.

### States

The web view entity only supports the `ON` state and the [common entity states](README.md#states).

| Value | Description                |
|-------|----------------------------|
| ON    | The web view can be shown. |

- An integration driver may report the state of its web view entities like for any other entity, e.g. `UNAVAILABLE`
  if it knows that the web server of the integrated system is unreachable.
- The Core reports a web view as `UNAVAILABLE` while no user interface that executes web view commands is connected,
  e.g. while the user interface restarts. Commands are then refused with error code `503`.
- A web view from an integration driver doesn't depend on the connection of the integration driver: the page is loaded
  directly from its web server.

See [common entity states](README.md#states).

### Device Classes

None.

### Options

The options are grouped by topic. All options except `url` are optional.

- Origin: the scheme, host and port of the `url` option. Authentication, cookies and certificate exceptions only apply
  to this origin.
- Write-only: a secret option. Responses omit its value. See [secret options](#secret-options).

#### Page

| Name | Type   | Default  | Description                                                                                                                                                                             |
|------|--------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| url  | string | required | Start page of the web view. Absolute `http://` or `https://` URL, at most 2048 characters. User name and password in the URL (`https://user:password@host/`) are not allowed, use `auth`. |

- Other URL schemes like `file:`, `data:` or `javascript:` are refused.
- Don't put tokens or passwords in the query string of the URL. The URL is not a secret option: it is returned by the
  Core-API and included in backups. Use `auth` or `cookies` instead.

#### Authentication

The `auth` object defines the credentials which the web view sends to the origin of the `url` option.

| Name              | Type                 | Default | Description                                                                                     |
|-------------------|----------------------|---------|-------------------------------------------------------------------------------------------------|
| auth.type         | enum                 | none    | Authentication method: `none`, `basic`, `bearer` or `header`.                                   |
| auth.username     | string               |         | `basic`: user name, at most 256 characters.                                                     |
| auth.password     | string, write-only   |         | `basic`: password, at most 256 characters.                                                      |
| auth.token        | string, write-only   |         | `bearer`: token, sent as `Authorization: Bearer <token>`. At most 4096 characters.              |
| auth.header_name  | string               |         | `header`: name of the HTTP request header, e.g. `X-API-Key`.                                    |
| auth.header_value | string, write-only   |         | `header`: value of the HTTP request header, e.g. an API key. At most 4096 characters.           |

- The credentials are only sent to the origin of the `url` option. Requests to other origins, e.g. a CDN, an embedded
  page of another site or a redirect target on another host, never receive them.
- `basic`: the user name and password are sent as answer to an HTTP authentication request (status `401`) of the origin.
  They are not sent preemptively: the first request is sent without credentials. The same credentials answer a Digest
  authentication request. The configured credentials never answer a proxy authentication request.
  - If the server rejects the credentials, the fullscreen web view shows its login dialog. The
    [web view widget](#activity-widget) shows no login dialog.
- `bearer` and `header`: the header is added to every HTTP request to the origin while the web view shows a page of the
  origin: the page, its resources like scripts, styles and images, and `fetch` / `XMLHttpRequest` calls. It is removed
  if a request is redirected to another origin.
  - WebSocket connections and requests of service workers don't receive the header.
  - `header_name` must be a valid HTTP header name of at most 64 characters. The following headers can't be set: `Host`,
    `Cookie`, `Content-Length`, `Content-Type`, `Connection`, `Transfer-Encoding`, `Upgrade`, `Origin`, `Referer`, and
    all headers starting with `Proxy-` or `Sec-`.
  - The token and the header value must only contain visible ASCII characters, spaces and tabs, without a space or a
    tab at the start or the end. The web view doesn't send a header with another value, and it doesn't send the headers
    `Cookie2`, `Expect`, `Keep-Alive`, `TE`, `Trailer` and `User-Agent`.
- With an `http://` URL the page and the credentials are sent unencrypted. The web-configurator shows a note at an
  `http://` URL.
- If `auth.type` changes, the secret options of the previous type are removed.

#### TLS certificates

By default, a page with an invalid TLS certificate, e.g. a self-signed certificate, an expired certificate or a
certificate of an unknown certificate authority, isn't loaded: the web view shows an error message. The `tls` object
allows an exception for the host of the `url` option. Certificate errors of all hosts can only be ignored with the
global setting [allow invalid TLS certificates for all web views](#allow-invalid-tls-certificates-for-all-web-views).

| Name                          | Type    | Default | Description                                                                                                                                                                    |
|-------------------------------|---------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| tls.certificate_sha256        | string  |         | SHA-256 fingerprint of the expected server certificate: 64 hexadecimal digits, optionally separated by `:`, case-insensitive. An invalid certificate is accepted if its fingerprint matches. |
| tls.allow_invalid_certificate | boolean | false   | Accept any invalid certificate of the host. Only used if `certificate_sha256` is not set.                                                                                       |

- The exception only applies to page loads from the host of the `url` option. Resources and embedded pages from other
  hosts with an invalid certificate are not loaded.
- The fingerprint is calculated over the DER-encoded leaf certificate, e.g. with
  `openssl x509 -in cert.pem -noout -fingerprint -sha256`.
- The fingerprint is only checked if the certificate is invalid. A valid certificate is always accepted.
- `certificate_sha256` is the recommended option: it only accepts the expected certificate. With
  `allow_invalid_certificate`, any certificate presented for the host is accepted, which allows a man-in-the-middle
  attack on that host.
- A renewed self-signed certificate has a new fingerprint. The web view then shows an error message until the
  fingerprint is updated.
- All web views share their [website data](#website-data): a certificate accepted for one web view is also accepted by
  the other web views.
- An accepted certificate stays accepted until the user interface restarts, also if the `tls` option is changed or
  removed, or the website data is cleared.
- The global setting [allow invalid TLS certificates for all web views](#allow-invalid-tls-certificates-for-all-web-views)
  overrides the `tls` options: if it is enabled, every web view accepts invalid certificates of all hosts.

#### Cookies

The `cookies` list sets cookies before the start page is loaded, e.g. a session cookie or a layout preference of the
page. At most 20 cookies.

| Name                 | Type               | Default                    | Description                                                                                                     |
|----------------------|--------------------|----------------------------|-----------------------------------------------------------------------------------------------------------------|
| cookies[].name       | string             | required                   | Cookie name, at most 256 characters.                                                                            |
| cookies[].value      | string, write-only | required                   | Cookie value, at most 4096 characters. A valid cookie value according to RFC 6265.                              |
| cookies[].domain     | string             | host of `url`              | Domain of the cookie: the host of the `url` option or a parent domain of it, at most 255 characters. If not set, the cookie is only sent to the host of `url` (host-only cookie). |
| cookies[].path       | string             | `/`                        | Path of the cookie, at most 1024 characters.                                                                    |
| cookies[].secure     | boolean            | true for an `https://` URL | Only send the cookie over HTTPS.                                                                                |
| cookies[].http_only  | boolean            | false                      | Hide the cookie from scripts of the page.                                                                       |
| cookies[].expires    | string             |                            | Expiry date in [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) format, e.g. `2027-01-01T00:00:00Z`. If not set, the cookie is a session cookie. |

- The cookies are set each time the web view is opened, before the start page is loaded. A cookie which has been
  changed or deleted by the page is set to the configured value again the next time the web view is opened.
- A cookie with a `domain` outside of the host of the `url` option, or a top-level domain like `com`, is refused with
  error code `400`.
- The web view doesn't set any of the configured cookies if one of them is invalid, e.g. a cookie name which is not an
  RFC 6265 token, or a `domain` which is a public suffix like `co.uk`. The page is then loaded without them.
- Cookies set by the page, e.g. after a login, are kept like the other [website data](#website-data).

#### Display

| Name                | Type    | Default              | Description                                                                                                                                                         |
|---------------------|---------|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| zoom                | integer | 100                  | Page zoom in percent: 25..400. The page is laid out for the zoomed size, e.g. 60 to show a dashboard made for tablets.                                               |
| background_color    | string  | `#FFFFFF`            | Background color while the page is loading and behind transparent pages, as `#RRGGBB`. If not set, white `#FFFFFF` is used.                                          |
| user_agent          | string  | default              | `default`: the user agent of the Remote, which identifies the Remote and its firmware version. `mobile` or `desktop`: the user agent of a common mobile or desktop browser, e.g. to get the mobile or the desktop layout of a page. Any other value: a custom user agent string, at most 256 visible ASCII characters and spaces. |

- `user_agent` is sent in the `User-Agent` header of every request of the web view, and returned to scripts of the page
  in `navigator.userAgent`.
- The web view uses the `default` user agent instead of a custom user agent with other characters, e.g. non-ASCII
  characters.
- A change of the `url`, `auth`, `tls`, `cookies` or `user_agent` option loads the start page of a shown web view
  again.

#### Navigation

| Name              | Type            | Default   | Description                                                                                                                                       |
|-------------------|-----------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| show_navigation   | boolean         | false     | Show back, forward, reload and close controls in the fullscreen web view. Not shown in a widget.                                                 |


#### Lifecycle

| Name              | Type    | Default | Description                                                                                                                                       |
|-------------------|---------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| reload_interval   | integer | 0       | Reload the page every n seconds while it is shown: 0 = off, otherwise 10..86400.                                                                  |

- The page is loaded when the web view is shown and unloaded when it's closed: the fullscreen web view when it's
  closed, a widget when its activity user interface page is left.
- A reload ends open dialogs of the page.
- The reload interval stops while the web view is hidden or the display is off, and starts again with the full
  interval when the page is shown again.

#### Buttons

The `buttons` object changes the function of single physical buttons in the [fullscreen web view](#fullscreen-web-view),
e.g. to send the CHANNEL buttons as key events to a page which handles them itself, or to keep the button mapping of
the activity for VOLUME up and down.

| Name    | Type   | Default | Description                                                                                                         |
|---------|--------|---------|---------------------------------------------------------------------------------------------------------------------|
| buttons | object |         | An action per button identifier, for the buttons which this web view sets. The other buttons have the action of the [global setting](#global-web-view-settings). |

```json
{
  "buttons": {
    "BACK": { "action": "function", "function": "back_or_close" },
    "VOLUME_UP": { "action": "pass" },
    "VOLUME_DOWN": { "action": "pass" },
    "CHANNEL_UP": { "action": "key", "key": "ChannelUp" },
    "CHANNEL_DOWN": { "action": "key", "key": "ChannelDown" }
  }
}
```

The key is the identifier of the physical button, the same as in the button mapping of an activity:

| Buttons                                                                                                                                  | Remote model |
|------------------------------------------------------------------------------------------------------------------------------------------|--------------|
| `BACK`, `DPAD_UP`, `DPAD_DOWN`, `DPAD_LEFT`, `DPAD_RIGHT`, `DPAD_MIDDLE`, `VOLUME_UP`, `VOLUME_DOWN`, `CHANNEL_UP`, `CHANNEL_DOWN`, `MUTE`, `PREV`, `PLAY`, `NEXT` | All          |
| `STOP`, `RECORD`, `MENU`                                                                                                                 | Remote 3     |
| `RED`, `GREEN`, `YELLOW`, `BLUE`                                                                                                         | Remote Two   |

- `HOME`, `POWER` and `VOICE` have a fixed function and can't be changed: HOME always closes the web view and shows the
  home screen, POWER and VOICE keep their normal function.
- Only the buttons of the Remote model can be set, like in the button mapping of an activity. A button which the model
  doesn't have, e.g. `MENU` on a Remote Two, a button with a fixed function or an unknown button is refused with error
  code `400` (`VALIDATION_ERROR`) with the field `options.buttons.<button>` and the code `INVALID`.
- In the entity definition of an integration driver, the buttons which the Remote model doesn't have are ignored: a
  driver can use the same definition for all models.
- A backup of another Remote model only restores the buttons of the Remote model, like the button mappings of
  activities: the buttons which the model doesn't have are removed, also from the user overrides.
- The buttons only apply to the fullscreen web view. In the [web view widget](#activity-widget), the buttons keep the
  button mapping of the activity.

The value is an object with the `action` of the button:

| action   | Description                                                                                                                                                                                                                                                           |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| pass     | The button keeps its function in the layer below the web view: the button mapping of the activity if the web view is shown on top of an activity, otherwise the function of the button on the screen below, e.g. the normal volume handling of the Remote on a profile page. |
| function | The web view function in `function`, see below.                                                                                                                                                                                                                       |
| key      | The key event in `key` is sent to the page, see below.                                                                                                                                                                                                                |

`function` is required for the `function` action and not allowed otherwise. `key` is required for the `key` action
and not allowed otherwise.

Web view functions:

| function                    | Description                                                                                                                                                                                                                                                  |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| zoom_in, zoom_out           | Zoom the page in or out by one step: 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250 and 300 %. The zoom starts at the effective `zoom` option of the entity. The changed zoom only applies until the web view is closed: it isn't saved to the entity. No effect while a dialog or the on-screen keyboard is open. |
| zoom_reset                  | Zoom back to the effective `zoom` option of the entity.                                                                                                                                                                                                      |
| scroll_up, scroll_down      | Scroll the page up or down by a small step.                                                                                                                                                                                                                  |
| page_up, page_down          | Scroll the page up or down by one screen, like the `PageUp` and `PageDown` keys. In a focused text field, they move the cursor.                                                                                                                              |
| top, bottom                 | Scroll to the top or the bottom of the page, like the `Home` and `End` keys. In a focused text field, they move the cursor.                                                                                                                                  |
| back, forward               | Go back or forward in the history of the web view.                                                                                                                                                                                                           |
| back_or_close               | Go back in the history, or close the web view on its first page.                                                                                                                                                                                             |
| reload                      | Reload the page.                                                                                                                                                                                                                                             |
| stop                        | Stop loading the page.                                                                                                                                                                                                                                       |
| close                       | Close the web view and return to the previous screen.                                                                                                                                                                                                        |
| toggle_navigation           | Show or hide the navigation controls, see `show_navigation`. The change isn't saved to the entity.                                                                                                                                                           |
| focus_next, focus_previous  | Move the focus to the next or the previous element of the page, like `Tab` and `Shift+Tab` on a keyboard.                                                                                                                                                    |
| none                        | The button does nothing.                                                                                                                                                                                                                                     |

Keys: the `KeyboardEvent.key` values of the [UI Events key values](https://www.w3.org/TR/uievents-key/) `ArrowUp`,
`ArrowDown`, `ArrowLeft`, `ArrowRight`, `Enter`, `Escape`, `Backspace`, `Tab`, `PageUp`, `PageDown`, `Home`, `End`,
`ContextMenu`, `BrowserBack`, `BrowserForward`, `BrowserRefresh`, `BrowserStop`, `Exit`, `AudioVolumeUp`,
`AudioVolumeDown`, `AudioVolumeMute`, `ChannelUp`, `ChannelDown`, `MediaPlayPause`, `MediaPlay`, `MediaPause`,
`MediaStop`, `MediaRecord`, `MediaRewind`, `MediaFastForward`, `MediaTrackPrevious`, `MediaTrackNext`, `ColorF0Red`,
`ColorF1Green`, `ColorF2Yellow` and `ColorF3Blue`.

- The page receives a real key event with this `key`, like from a keyboard. Its `code` is the
  [UI Events code value](https://www.w3.org/TR/uievents-code/) of the corresponding keyboard key where one exists,
  otherwise `Unidentified`: for `Exit`, `ChannelUp`, `ChannelDown`, `MediaPlay`, `MediaPause`, `MediaRecord`,
  `MediaRewind`, `MediaFastForward` and the color keys `ColorF0Red` to `ColorF3Blue`.
- Any button can send any of these keys, e.g. `ColorF0Red` from the PLAY button.

Held buttons:

- A held button repeats key events and the functions `scroll_up`, `scroll_down`, `page_up` and `page_down`.
- All other functions act once per press, e.g. a held VOLUME up zooms in by one step.
- A `pass` button behaves like in the layer below.

The action of a button is taken from the first of:

1. the [user override](#user-overrides) in `options.user.buttons`, only for a web view from an integration driver,
2. the `buttons` option of the web view,
3. the [global web view setting](#global-web-view-settings) `buttons`, which contains the default actions.

Default actions, if neither the global setting nor the web view changes a button:

| Button                                            | Default action                                        |
|---------------------------------------------------|-------------------------------------------------------|
| `DPAD_UP`, `DPAD_DOWN`, `DPAD_LEFT`, `DPAD_RIGHT` | key `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight` |
| `DPAD_MIDDLE`                                     | key `Enter`                                           |
| `BACK`                                            | function `close`                                      |
| `VOLUME_UP`, `VOLUME_DOWN`                        | function `zoom_in`, `zoom_out`                        |
| `CHANNEL_UP`, `CHANNEL_DOWN`                      | function `page_up`, `page_down`                       |
| `MENU`                                            | key `ContextMenu`                                     |
| All other buttons                                 | `pass`                                                |

Updating the buttons of a user-defined web view with the Core-API: `buttons` is merged button by button with the
stored buttons. An action sets a button, `null` removes it and the global setting applies again. `null` instead of the
object removes all buttons.

To set several buttons at once, a client can apply a [button preset](#button-presets).

### Secret options

The following options are secrets. They are part of the entity options: an integration driver sets them in the entity
definition, the user with the Core-API.

| Option             | Flag in responses       |
|--------------------|-------------------------|
| auth.password      | auth.has_password       |
| auth.token         | auth.has_token          |
| auth.header_value  | auth.has_header_value   |
| cookies[].value    | cookies[].has_value     |

The Remote protects the secret values with one central rule:

- **Responses:** every Core-API response omits the secret values and contains the flag instead, which tells whether
  the secret is set. This applies to all responses with entity data, e.g. `GET /api/entities`,
  `GET /api/entities/{entityId}`, `GET /api/webviews`, the available entities of an integration, and the WS messages
  `get_entity`, `get_entities` and `get_webviews`. It applies to every session, including `admin` sessions like the
  web-configurator, and API keys with the `remote-ui` scope, which is a regular scope that can be assigned to any API
  key.
- **Only exception:** the WebSocket session authenticated with the access token that the Core generates at startup for
  the locally installed user interface app. This session receives the secret values in the `get_entity` and
  `get_entities` responses, since the user interface needs them to load the page.
- **Events:** `entity_change` and all other events never contain secret values, for any session. If the options of a
  web view change, the `entity_change` event contains the entity without the secret values. The user interface then
  reloads the entity with `get_entity`.
- The Remote never writes secret values to its log.

Updating a user-defined web view with the Core-API:

- A missing `auth` secret keeps the stored value, as long as `auth.type` doesn't change.
- An empty string removes the stored `auth` secret.
- If `auth.type` changes, the secrets of the previous type are removed. `auth.type: none` removes all credentials.
- The `cookies` list replaces the stored list. A cookie without `value` keeps the stored value of the cookie with the
  same `name`, `domain` and `path`. A new cookie without `value`, or a cookie with an empty `value`, is refused with
  error code `400`.

> [!NOTE]
> A backup of the Remote contains the stored secret values of the web views: passwords, tokens, header values and
> cookie values. Keep backup files private.

### User overrides

The following options of a web view from an integration driver can be overridden by the user in the web-configurator.
See [user overrides](README.md#user-overrides).

| Name            | Description                                         |
|-----------------|-----------------------------------------------------|
| zoom            | Page zoom in percent.                               |
| reload_interval | Reload interval in seconds.                         |
| show_navigation | Navigation controls in the fullscreen web view.     |
| buttons         | Function of single buttons, see [buttons](#buttons). |

- The URL, authentication, TLS, cookie and user agent options can't be overridden: they belong to the integration
  driver. Any other option in `options.user` is refused with error code `400`.
- `null` removes an override: the option of the integration driver applies again.
- `buttons` is merged button by button: an override of a button replaces the action of the driver for this button,
  `null` removes the override. `null` instead of the object removes all button overrides. A button which the Remote
  model doesn't have, a button with a fixed function or an unknown button is refused with error code `400` with the
  field `options.user.buttons.<button>`.
- A user-defined web view has no user overrides: its options are changed directly. An option in `options.user` is
  refused with error code `400`.

## Global web view settings

The global web view settings apply to all web views on the Remote: user-defined web views and web views from
integration drivers. They are system settings, not entity options. They are changed on the Remote in Settings → Web
view, or by an administrator in the web-configurator or with the Core-API. The settings page on the Remote also has
buttons to clear the cache and the website data.

| Name                       | Type    | Default | Description                                                                                                                         |
|----------------------------|---------|---------|-------------------------------------------------------------------------------------------------------------------------------------|
| allow_invalid_certificates | boolean | false   | Allow invalid TLS certificates for all web views. See [below](#allow-invalid-tls-certificates-for-all-web-views).                     |
| color_scheme               | enum    | dark    | Color scheme for the pages: `light` or `dark`. See [color scheme](#color-scheme).                                                   |
| website_data               | enum    | keep    | What happens with the website data when a web view is closed: `keep`, `clear_cache_on_close` or `clear_all_on_close`. See [website data](#website-data). |
| buttons                    | object  |         | Function of the physical buttons in the fullscreen web view. See [button settings](#button-settings).                               |

Core-API:

| Operation                    | REST Core-API                         | WebSocket Core-API           |
|------------------------------|---------------------------------------|------------------------------|
| Get the settings             | `GET /api/cfg/webview`                | `get_webview_cfg`            |
| Change one or more settings  | `PATCH /api/cfg/webview`              | `set_webview_cfg`            |
| Get the button presets       | `GET /api/cfg/webview/button_presets` | `get_webview_button_presets` |

- The settings are part of all system settings in `GET /api/cfg` and `get_configuration`, and are reset to the default
  values with `DELETE /api/cfg` and `reset_configuration`.
- A change is reported with the `configuration_change` event.
- Changing the settings requires the `admin` scope. Other API keys are refused with error code `403`.

### Button settings

`buttons` defines the function of the physical buttons in the [fullscreen web view](#fullscreen-web-view) for all web
views: an action per button identifier, in the same format as the [buttons](#buttons) option of a web view. A web view
can change single buttons with its `buttons` option.

- The settings contain every button of the Remote model which can be changed, with its configured action or its
  [default action](#buttons).
- A change is merged button by button: a button which is not in the request keeps its action, an action replaces the
  action of the button, `null` resets the button to its default action.
- Only the buttons of the Remote model can be changed. A button which the model doesn't have, e.g. `MENU` on a Remote
  Two, a button with a fixed function (`HOME`, `POWER`, `VOICE`) or an unknown button is refused with error code `400`
  (`VALIDATION_ERROR`) with the field `buttons.<button>` and the code `INVALID`.
- A backup of another Remote model only restores the buttons of the Remote model, like the button mappings of
  activities: the buttons which the model doesn't have are removed.

Keep the button mapping of the activity for VOLUME up and down, and reset BACK to its default action
(`PATCH /api/cfg/webview`):

```json
{
  "buttons": {
    "VOLUME_UP": { "action": "pass" },
    "VOLUME_DOWN": { "action": "pass" },
    "BACK": null
  }
}
```

### Button presets

A button preset sets several buttons at once, e.g. all buttons for a page which handles the buttons of the Remote
itself. The presets of the Remote model are read with `GET /api/cfg/webview/button_presets` or
`get_webview_button_presets`, also without the `admin` scope.

- A preset has an `id` and the `buttons` it covers, in the format of the [buttons](#buttons) option. It only contains
  the buttons of the Remote model, e.g. `STOP` only on a Remote 3 and the color buttons only on a Remote Two. `HOME`,
  `POWER` and `VOICE` are never part of a preset.
- There is no operation to apply a preset. A client sends the `buttons` of the preset with an existing button update:
  the [global setting](#button-settings) `buttons`, the `buttons` option of a user-defined web view or the
  [user override](#user-overrides) `options.user.buttons` of a web view from an integration driver. Only the buttons of
  the preset change, every other button keeps its action.
- A client must ignore a preset with an unknown `id`: more presets can be added. The Core-API has no names for the
  presets: a client names them itself.

| Button                                            | `web_view_functions`            | `page_keys`                                                      |
|---------------------------------------------------|---------------------------------|------------------------------------------------------------------|
| `DPAD_UP`, `DPAD_DOWN`, `DPAD_LEFT`, `DPAD_RIGHT` | –                               | key `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`            |
| `DPAD_MIDDLE`                                     | –                               | key `Enter`                                                      |
| `BACK`                                            | function `back_or_close`        | key `Escape`                                                     |
| `VOLUME_UP`, `VOLUME_DOWN`                        | function `zoom_in`, `zoom_out`  | key `AudioVolumeUp`, `AudioVolumeDown`                           |
| `MUTE`                                            | function `zoom_reset`           | key `AudioVolumeMute`                                            |
| `CHANNEL_UP`, `CHANNEL_DOWN`                      | function `page_up`, `page_down` | key `ChannelUp`, `ChannelDown`                                   |
| `PREV`, `NEXT`                                    | function `back`, `forward`      | key `MediaTrackPrevious`, `MediaTrackNext`                       |
| `PLAY`                                            | function `reload`               | key `MediaPlayPause`                                             |
| `STOP`                                            | function `stop`                 | key `MediaStop`                                                  |
| `RECORD`                                          | –                               | key `MediaRecord`                                                |
| `MENU`                                            | function `toggle_navigation`    | key `ContextMenu`                                                |
| `RED`, `GREEN`, `YELLOW`, `BLUE`                  | –                               | key `ColorF0Red`, `ColorF1Green`, `ColorF2Yellow`, `ColorF3Blue` |

–: the button is not part of the preset and keeps its action.

Presets on a Remote Two, shortened:

```json
[
  {
    "id": "web_view_functions",
    "buttons": {
      "BACK": { "action": "function", "function": "back_or_close" },
      "VOLUME_UP": { "action": "function", "function": "zoom_in" },
      "VOLUME_DOWN": { "action": "function", "function": "zoom_out" }
    }
  },
  {
    "id": "page_keys",
    "buttons": {
      "DPAD_MIDDLE": { "action": "key", "key": "Enter" },
      "BACK": { "action": "key", "key": "Escape" },
      "RED": { "action": "key", "key": "ColorF0Red" }
    }
  }
]
```

### Allow invalid TLS certificates for all web views

With `allow_invalid_certificates` enabled, every web view accepts invalid TLS certificates of all hosts: self-signed
certificates, expired certificates, certificates of an unknown certificate authority and certificates for another host
name. It overrides the [`tls` options](#tls-certificates) of every web view entity, user-defined and from integration
drivers.

> [!WARNING]
> This turns off the certificate check for every page and every resource loaded by any web view, including third-party
> hosts like content delivery networks, embedded pages and redirect targets. A man-in-the-middle attack on any of these
> connections is not detected, and the credentials and cookies of the web views can be intercepted.
>
> The setting applies to the whole Remote. Prefer the `tls` option of a web view entity: it only applies to the host
> of its `url` option, and with `certificate_sha256` only to the expected certificate.

- The setting applies to new connections. Shown pages are not reloaded.

### Color scheme

`color_scheme` sets the CSS media feature `prefers-color-scheme` for all web views: `light` or `dark`. Default: `dark`.

- A page can query it, e.g. a dashboard with a light and a dark theme shows the matching theme.
- Only pages which support `prefers-color-scheme`, or declare the CSS property `color-scheme`, react to it. It doesn't
  force a theme onto other pages, and it's not sent as an HTTP header.

### Website data

All web views on the Remote share their website data: cookies, the HTTP cache, local storage, IndexedDB and service
workers.

- A login in one web view also applies to the other web views of the same site.
- With `website_data: keep`, the website data is kept across restarts of the user interface and the Remote. A cookie
  login made by the user in a web view stays valid, as long as the web server accepts it. Session cookies, i.e.
  cookies without an expiry date, end when the user interface restarts.
- Credentials entered in a login dialog of a web view are kept until the user interface restarts. Credentials
  configured in the `auth` option of a web view entity are sent again automatically.
- Clearing website data, with the `website_data` setting, the clear buttons in the web view settings of the Remote, or
  the `clear_cache` and `clear_data` [commands](#commands), affects all web views.

`website_data` defines what happens with the website data when a web view is closed: when the fullscreen web view is
closed, or when the activity user interface page with the web view widget is left.

| Value                | Description                                                                                                                                                                                                                                                                                    |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| keep                 | Default. The website data is kept, also across restarts of the user interface and the Remote.                                                                                                                                                                                                  |
| clear_cache_on_close | The HTTP cache is cleared whenever a web view is closed.                                                                                                                                                                                                                                       |
| clear_all_on_close   | All website data is cleared whenever a web view is closed. Pages which rely on a cookie login ask to log in again. Credentials entered in a login dialog are kept until the user interface restarts. The configured credentials and cookies of a web view entity are sent again automatically. |

## User interface

### Profile page tile

A web view entity can be added to a profile page like any other entity. The tile shows the icon and the name of the
entity. Tapping the tile opens the [fullscreen web view](#fullscreen-web-view). The page is not loaded until the tile is
tapped.

### Fullscreen web view

The fullscreen web view covers the whole screen. It is opened by tapping a profile page tile, by the `open`
[command](#commands), e.g. from an icon on an activity user interface page, by tapping a web view widget which is not
interactive, or from the list of included entities of an activity.

- With the `show_navigation` option, the web view shows controls to go back, go forward, reload the page and close the
  web view.
- Button handling, also on top of an activity screen:
  - HOME closes the web view and shows the home screen.
  - POWER and VOICE keep their normal function.
  - All other buttons have the action of the [buttons](#buttons) option of the web view and the
    [global button settings](#button-settings). By default, BACK closes the web view, the D-pad sends the arrow keys
    and OK the `Enter` key to the page, VOLUME up and down zoom the page in and out, CHANNEL up and down scroll the
    page by one screen, and MENU sends the `ContextMenu` key. The other buttons keep their function, e.g. MUTE, PREV,
    PLAY, NEXT and the color buttons keep the button mapping of the active activity.
  - While the on-screen keyboard is shown, the D-pad and OK are sent to the text field of the page.
  - While a page couldn't be loaded, OK loads it again.
- HTTP login requests of the page without configured credentials, and `alert`, `confirm` and `prompt` dialogs of the
  page, are shown as dialogs of the UI. While a dialog is shown, BACK and HOME close the dialog, and the other buttons
  have no effect.
- While the web view entity is unavailable, the web view shows a message instead of the page. Its tile doesn't open it.

### Activity widget

The [web view widget](../ui-widgets.md#web-view) shows the web page in an activity user interface page:

- The web view entity must be an included entity of the activity.
- At most one web view widget per activity, over all pages.
- Minimum size: 3 × 3 grid fields.
- Not available in the user interface of a remote entity.

The UI shows one web page at a time: while a fullscreen web view is open, the page of a widget is unloaded and loaded
again afterwards.

The widget shows no dialogs: `alert`, `confirm` and `prompt` dialogs of the page are answered with cancel. An HTTP
login request without configured credentials, or after rejected credentials, is answered without credentials: the
widget shows the error page of the server. Open the web view fullscreen to log in.

## Commands

The commands of a web view entity are executed by the user interface of the Remote. They work like the commands of
other entities: in activity on- and off-sequences, macros, button mappings, activity user interface items, and with
`PUT /api/entities/{entityId}/command` or `execute_entity_command` from any Core-API client. Tapping a tile opens the
web view.

| cmd_id      | Core-API cmd_id     | Parameters | Description                                                                                                                                                                                                    |
|-------------|---------------------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| open        | webview.open        | -          | Wake the display and show the web view fullscreen with its start page. See [open](#open).                                                                                                                      |
| reload      | webview.reload      | -          | Reload the shown page: in the fullscreen web view or in the widget. No effect if the web view isn't shown.                                                                                                     |
| clear_cache | webview.clear_cache | -          | Clear the HTTP cache of all web views and reload the shown page.                                                                                                                                               |
| clear_data  | webview.clear_data  | -          | Clear all website data of all web views. Pages which rely on a cookie login ask to log in again. Credentials entered in a login dialog are kept until the user interface restarts. The shown page is reloaded. |

- All web views share their [website data](#website-data): `clear_cache` and `clear_data` clear the data of all web
  views.

### Open

- `open` always wakes the display.
- The web view is shown fullscreen on top of the current screen. Closing it returns to the previous screen. An entity
  screen which is open on top of an activity is closed first: closing the web view returns to the activity.
- If an activity is being started, e.g. if `open` is a step of its on-sequence, the web view opens after the loading
  screen of the activity, on top of the activity screen.
- If the web view is already open, it stays as is. Another open web view is replaced.

### Command routing

The Core routes the commands of entity types which the user interface executes, currently only `webview`, to the
locally installed user interface app, not to the integration of the entity. This applies to user-defined web views and
to web views from integration drivers: web view commands are never sent to an integration driver.

- The user interface answers `open` and `reload` when it has accepted the command, not when the page has loaded.
  `clear_cache` and `clear_data` are answered when the data has been cleared. Sequences wait for the result of each
  step.
- The Core returns the result of the user interface to the caller.
- Error code `503` if no user interface that executes web view commands is connected, or if it can't show web pages.
  `408` if the user interface doesn't answer within 5 seconds.
- The user interface app declares the entity types it executes with the internal WS Core-API request `set_ui_info`,
  and receives the commands with the internal request `entity_command`. Both are only for the user interface session
  authenticated with the access token that the Core generates at startup for the locally installed user interface app.
  Other clients must not use them.

### Command examples

Activity user interface item which opens the web view fullscreen. The web view entity must be an included entity of
the activity:

```json
{
  "type": "text",
  "text": "Dashboard",
  "command": {
    "entity_id": "uc_web.main.0f3b6f0e-6b8c-4a43-9d38-2b1e8a3f0c11",
    "cmd_id": "webview.open"
  },
  "location": { "x": 0, "y": 5 },
  "size": { "width": 2, "height": 1 }
}
```

Step of an activity on-sequence, which shows the dashboard after the activity has started:

```json
{
  "type": "command",
  "command": {
    "entity_id": "uc_web.main.0f3b6f0e-6b8c-4a43-9d38-2b1e8a3f0c11",
    "cmd_id": "webview.open"
  }
}
```

Another system opens the web view with the REST Core-API
`PUT /api/entities/uc_web.main.7c2d5e1a-0b4f-4c5e-9a61-3d8f2b7e9c40/command`:

```json
{
  "cmd_id": "webview.open"
}
```

## Core-API

### User-defined web views

The user creates and edits web views in the web-configurator. The Core-API has a dedicated resource for them, modelled
on the remote entity endpoints:

| Operation                     | REST Core-API                      | WebSocket Core-API      |
|-------------------------------|------------------------------------|-------------------------|
| Number of web views           | `HEAD /api/webviews`               | `get_webview_count`     |
| List web views, with paging   | `GET /api/webviews`                | `get_webviews`          |
| Create a web view             | `POST /api/webviews`               | `create_webview`        |
| Get a web view                | `GET /api/webviews/{entityId}`     | `get_webview`           |
| Update a web view             | `PATCH /api/webviews/{entityId}`   | `update_webview`        |
| Delete a web view             | `DELETE /api/webviews/{entityId}`  | `delete_webview`        |
| Delete all user web views     | `DELETE /api/webviews`             | `delete_all_webviews`   |

- The list contains user-defined web views and web views from integration drivers. The `kind` filter selects one of
  them: `USER` or `EXTERNAL`.
- Web views created on the Remote belong to the internal integration `uc_web.main`. Their entity identifier is
  `uc_web.main.<uuid>`.
- `POST /api/webviews` only creates user-defined web views. Web views from integration drivers are configured like any
  other entity of an integration.
- At most 1000 user-defined web views can be created.
- A new web view can be cloned from a user-defined web view with `clone_from`: it gets the options of that web view,
  including the secret options. The name must be specified, the icon and the description are not copied. Options in
  the request are applied to the copied options like in an update. Web views from integration drivers can't be cloned.
- `DELETE /api/webviews` deletes all user-defined web views. Web views from integration drivers are not deleted.
- Responses contain the read-only option `editable`: `true` for a user-defined web view, `false` for a web view from
  an integration driver.
- Changes are reported with the `entity_change` event, in the event channel `entity_webview`. The event never contains
  secret values, see [secret options](#secret-options).

Updating the options of a user-defined web view:

- An omitted option is not changed. `null` removes an option and its default applies. `url` can't be removed.
- `auth`, `tls` and `cookies` replace the stored object or list. An empty `tls` object removes the certificate
  exception, an empty `cookies` list removes all cookies.
- An empty `background_color` restores the default white `#FFFFFF`.
- `buttons` is merged button by button, see [buttons](#buttons).
- Secret options: see [secret options](#secret-options).

Create a web view:

```json
{
  "name": {
    "en": "NAS status"
  },
  "options": {
    "url": "https://nas.home.arpa:5001/status",
    "auth": {
      "type": "basic",
      "username": "viewer",
      "password": "my-secret"
    },
    "tls": {
      "certificate_sha256": "3F:A9:12:5C:77:0B:E4:21:9D:6A:C8:0F:41:B2:93:EE:58:17:0C:D4:2A:9B:61:F0:7E:3C:88:15:A6:D2:4B:C9"
    },
    "zoom": 80,
    "reload_interval": 300
  }
}
```

Response, the password is replaced by `has_password`:

```json
{
  "entity_id": "uc_web.main.0f3b6f0e-6b8c-4a43-9d38-2b1e8a3f0c11",
  "entity_type": "webview",
  "integration_id": "uc_web.main",
  "name": {
    "en": "NAS status"
  },
  "features": [],
  "options": {
    "editable": true,
    "url": "https://nas.home.arpa:5001/status",
    "auth": {
      "type": "basic",
      "username": "viewer",
      "has_password": true
    },
    "tls": {
      "certificate_sha256": "3F:A9:12:5C:77:0B:E4:21:9D:6A:C8:0F:41:B2:93:EE:58:17:0C:D4:2A:9B:61:F0:7E:3C:88:15:A6:D2:4B:C9"
    },
    "zoom": 80,
    "reload_interval": 300
  },
  "attributes": {
    "state": "ON"
  }
}
```

Update the zoom and the user name, and keep the password:

```json
{
  "options": {
    "zoom": 70,
    "auth": {
      "type": "basic",
      "username": "kiosk"
    }
  }
}
```

### Web views from integration drivers

A web view entity from an integration driver is configured like any other entity of the integration. The
`/api/webviews` endpoints also return it, with `options.editable: false`.

- The name, icon and description can be changed.
- The options of the integration driver can't be changed. Only the [user overrides](#user-overrides) in `options.user`
  can be set, with `PATCH /api/webviews/{entityId}`, `PATCH /api/entities/{entityId}`, `update_webview` or
  `update_entity`. `PATCH /api/webviews/{entityId}` and `update_webview` refuse any other option with error code `422`.
- `DELETE /api/webviews/{entityId}` removes it from the configured entities, like `DELETE /api/entities/{entityId}`. It
  can be configured again from its integration.

## Integration API

### Entity definition

The Remote checks the options of a web view entity from an integration driver with the same rules as the options of a
user-defined web view.

- A web view entity with invalid options, e.g. an invalid `url`, a cookie without `value`, or a button with a fixed
  function or an unknown button, is ignored: it isn't offered as an available entity, and an `entity_available` event
  with it doesn't change the configured web view.
- Unknown options are removed.
- The buttons which the Remote model doesn't have are removed, see [buttons](#buttons).

### Commands

Web view commands are never sent to integration drivers: they are executed by the user interface of the Remote, see
[commands](#commands).

### Events

The `entity_change` event can be emitted by the integration driver if the state of the web view changes, like for any
other entity.

| Attribute | Description                       |
|-----------|-----------------------------------|
| state     | Optional entity [state](#states). |

- If the state is never sent, the Core reports the web view as `ON` while a user interface that executes web view
  commands is connected, see [states](#states).

### Updating the entity definition

The options are part of the entity definition. If an option changes, e.g. a new URL, a rotated token or new cookies,
the integration driver sends the updated entity definition with the `entity_available` event.

- The event contains the complete entity definition, not only the changed options.
- If the web view is configured on the Remote, the Core updates its `device_class`, `features` and `options`. The
  [user overrides](#user-overrides) in `options.user` are kept.
- The Core informs its clients with an `entity_change` event, without secret values.
- The Core also retrieves the available entities whenever the integration driver connects.
- A driver removes a web view with the `entity_removed` event. A configured web view isn't deleted, it becomes
  `UNAVAILABLE`.
- The `entity_change` event can't change options: it only contains attributes.
- An older Remote firmware ignores `entity_available` and `entity_removed`. It applies an updated entity definition only
  when it retrieves the available entities again, e.g. after the driver reconnects.

Rotated bearer token of a dashboard:

```json
{
  "kind": "event",
  "msg": "entity_available",
  "cat": "ENTITY",
  "msg_data": {
    "entity_id": "dashboard-energy",
    "entity_type": "webview",
    "name": {
      "en": "Energy dashboard",
      "de": "Energie-Dashboard"
    },
    "options": {
      "url": "https://dashboard.example.com/energy?kiosk=1",
      "auth": {
        "type": "bearer",
        "token": "eyJhbGciOiJIUzI1NiJ9.rotated.token"
      },
      "user_agent": "desktop",
      "zoom": 70
    }
  }
}
```

### Entity definition examples

Dashboard with a bearer token, with the desktop layout of the page zoomed out for the small screen:

```json
{
  "entity_id": "dashboard-energy",
  "entity_type": "webview",
  "name": {
    "en": "Energy dashboard",
    "de": "Energie-Dashboard"
  },
  "options": {
    "url": "https://dashboard.example.com/energy?kiosk=1",
    "auth": {
      "type": "bearer",
      "token": "eyJhbGciOiJIUzI1NiJ9.example.token"
    },
    "user_agent": "desktop",
    "zoom": 70
  }
}
```

Status page with an API key header and a cookie for the page layout, reloaded every minute:

```json
{
  "entity_id": "inverter-status",
  "entity_type": "webview",
  "name": {
    "en": "Solar inverter"
  },
  "options": {
    "url": "http://inverter.home.arpa/status",
    "auth": {
      "type": "header",
      "header_name": "X-API-Key",
      "header_value": "3b1f0c9e7a"
    },
    "cookies": [
      {
        "name": "layout",
        "value": "compact"
      }
    ],
    "reload_interval": 60,
    "show_navigation": true
  }
}
```

### Event examples

#### Web server of the integrated system unreachable

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "webview",
    "entity_id": "dashboard-energy",
    "attributes": {
      "state": "UNAVAILABLE"
    }
  }
}
```

#### Web server reachable again

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "webview",
    "entity_id": "dashboard-energy",
    "attributes": {
      "state": "ON"
    }
  }
}
```
