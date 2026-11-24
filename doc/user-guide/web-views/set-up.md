# Setting up a web view in the web-configurator

> Applies to firmware 2.14.0 and newer, on the Remote Two and the Remote 3.

You create and change web views in the web-configurator, under **Entities** > **Web views**. This article explains every setting.

## The Web views tab

Go to **Entities** and select the **Web views** tab. It lists your own web views and the web views from your integrations.

![The Web views tab with the toolbar](images/wc-01-webviews-tab.png)

- **Search:** type in the search field to find a web view by name.
- **Show:** choose **All web views**, **Own web views** or **From integrations**.
- **Sort:** sort by **Name** or **Created**, in **Ascending** or **Descending** order.
- **Add web view:** create a new web view.
- **Delete:** select one or more web views in the list, then click the delete (trash) button.

![The Show filter](images/wc-02-show-filter.png)

Click a web view to open its editor. The editor has two tabs: **Settings** and **Button mapping**.

## Add a web view

1. On the **Web views** tab, click **Add web view**.
2. Enter a **Name**.
3. Enter the **URL** of the page. It must start with `http://` or `https://`.
4. Optional: choose another of your own web views in **Copy settings from**.
5. Click **Create**.

![The Add web view dialog](images/wc-03-add-dialog.png)

> [!WARNING]
> Add only pages you trust that are made for the Remote, such as dashboards and status pages. Don't use web views for online banking, payments, online shopping or to enter sensitive personal information. See [Web views: overview and first steps](overview.md).

### Copy settings from

**Copy settings from** copies all settings of one of your own web views, including its login and cookies. The icon and the description are not copied. If you leave the **URL** empty, the new web view keeps the address of the copy.

You can do the same from the editor of a web view: click **Clone**.

> [!NOTE]
> Web views from integrations can't be copied or cloned.

## Name, icon and description

At the top of the editor, change the icon, the **Name** and the **Description**. This works for your own web views and for web views from integrations.

## Main settings

![The main settings of a web view](images/wc-04-editor-general.png)

### URL

The start page of the web view. It opens every time you open the web view.

- Don't put a user name and password in the address (`https://user:password@...`). Use **Authentication** instead. See [Logins, cookies and certificates](logins-cookies-certificates.md).
- Don't put tokens or passwords in the address either. The address is not stored as a secret.
- An `http://` address is not encrypted: the page and any login details are sent as plain text.

> [!TIP]
> The button next to the URL opens the page in your computer's browser. Authentication and cookies aren't applied there.

### Zoom

The page zoom in percent, from 25 to 400. The default is 100. The page is laid out for the zoomed size. For example, a zoom of 60 shows a dashboard that was made for a tablet.

### Background color

The color shown while the page loads and behind transparent pages. The default is white. Use the reset button to go back to white.

### User agent

How the web view identifies itself to the page:

| Option | When to use it |
|---|---|
| **Default (Remote)** | Identifies the Remote and its firmware version. |
| **Mobile browser** | Get the mobile layout of a page. |
| **Desktop browser** | Get the desktop layout of a page. |
| **Custom text** | Enter your own text, at most 256 characters. |

![User agent and Page API settings](images/wc-05-editor-advanced.png)

### Navigation and reload

- **Show navigation controls:** shows back, forward, reload and close buttons at the bottom of the full-screen web view. They are not shown in an activity widget.
- **Reload interval:** reloads the page every few seconds while it is shown: from 10 to 86400 seconds (one day), or **Never**. The timer pauses while the page is hidden or the display is off.

### Page API: Device state API for pages

Turn on **Device state API for pages** only if your page is made to use it. Pages in this web view can then read the Remote's display, battery and power state and react to standby, for example to stop updates while the display is off.

The state is shared with every page the web view opens, also with pages of other sites.

Developers can find the details in the [device state documentation](https://github.com/unfoldedcircle/core-api/blob/main/doc/entities/entity_webview.md#device-state-for-web-pages).

### Authentication, Certificate and Cookies

These sections are explained in [Logins, cookies and certificates](logins-cookies-certificates.md). Each section has its own **Save** and **Cancel** buttons.

## Button mapping

The **Button mapping** tab sets what the buttons of the Remote do while this web view is open in full screen. Choose a button in the list or on the picture of the Remote.

![The Button mapping tab](images/wc-06-editor-buttons.png)

For each button, choose:

- **As in the settings:** the button does what is set for all web views in **Settings** > **Web view** > **Buttons**. For a web view from an integration, this choice is **As the integration sets it**.
- **Normal function:** the button keeps its normal function, for example the button mapping of the activity.
- **Web view function:** for example **Zoom in**, **Page down**, **Back**, **Reload**, **Close** or **Show or hide navigation**.
- **Send key to page:** the button sends a key to the page, for example an arrow key. Use this for pages that handle the Remote's buttons themselves.

**Button presets** change several buttons at once:

- **Default mapping:** removes all own settings of this web view.
- **Web view functions:** zoom, scroll, back, forward and reload.
- **Page keys:** arrow, media and color keys for the page itself.

HOME, POWER and the voice button can't be changed. The button mapping only applies to the full-screen web view. In an activity widget, the buttons keep the activity's button mapping.

The default functions of the buttons are listed in [Using web views on the Remote](using-on-the-remote.md).

## Web views from integrations

An integration sets the address, the login, the certificate, the cookies, the user agent and the background color of its web views. The editor shows them under **Set by the integration**. You can't change them.

![A web view from an integration with the override settings](images/wc-10-integration-overrides.png)

You can override these settings:

| Setting | How to return to the integration's value |
|---|---|
| **Zoom** | Click the reset button (**Use the zoom of the integration**). |
| **Show navigation controls** | Choose **As the integration sets it**. |
| **Reload interval** | Click the reset button (**Use the reload interval of the integration**). |
| **Device state API for pages** | Choose **As the integration sets it**. |
| Buttons (**Button mapping** tab) | Choose **As the integration sets it** for a button, or apply **Default mapping** in **Button presets**. |

The text below each setting shows what the integration sets.

## Delete or remove a web view

- **Own web view:** click **Delete** in the editor. The web view is deleted for good, with its stored credentials and cookies.
- **Web view from an integration:** click **Remove**. You can add it again from its integration.

## Settings for all web views

Some settings apply to all web views. Find them in the web-configurator under **Settings** > **Web view**, or on the Remote under **Settings** > **Web view**:

- **Color scheme:** **Dark** or **Light**. Only pages that offer a dark design follow this setting.
- **Website data on close:** what is deleted when a web page is closed: **Keep**, **Clear cache** or **Clear all website data**.
- **Allow invalid certificates:** see [Logins, cookies and certificates](logins-cookies-certificates.md).
- **Buttons:** what the buttons of the Remote do in a full-screen web page, for all web views. A web view can change single buttons.

![Settings > Web view in the web-configurator](images/wc-09-settings-webview.png)

## Limit

You can create up to **1000** of your own web views. When you reach the limit, **Add web view** is disabled and the web-configurator shows "You have 1000 own web views, the most the Remote can have." Delete a web view you no longer need to add a new one. Web views from integrations don't count toward this limit.
