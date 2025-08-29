// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">Introduction</a></li><li class="chapter-item expanded affix "><li class="part-title">User Guide</li><li class="chapter-item expanded "><a href="remote-ui.html"><strong aria-hidden="true">1.</strong> Remote Two user interface</a></li><li class="chapter-item expanded "><a href="discovery.html"><strong aria-hidden="true">2.</strong> Remote Two DNS-SD lookup</a></li><li class="chapter-item expanded affix "><li class="part-title">Bluetooth</li><li class="chapter-item expanded "><a href="bt/index.html"><strong aria-hidden="true">3.</strong> Bluetooth HID peripheral support</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="bt/TODO.html"><strong aria-hidden="true">3.1.</strong> Restrictions and missing features</a></li><li class="chapter-item expanded "><a href="bt/known_issues.html"><strong aria-hidden="true">3.2.</strong> Known issues</a></li><li class="chapter-item expanded "><a href="bt/suspend_behaviour.html"><strong aria-hidden="true">3.3.</strong> BT suspend / wakeup patterns</a></li><li class="chapter-item expanded "><a href="bt/virtual_keyboard.html"><strong aria-hidden="true">3.4.</strong> Virtual keyboard</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="bt/hid_keycodes.html"><strong aria-hidden="true">3.4.1.</strong> Regular keycodes</a></li><li class="chapter-item expanded "><a href="bt/hid_consumer.html"><strong aria-hidden="true">3.4.2.</strong> Consumer codes</a></li><li class="chapter-item expanded "><a href="bt/hid_system_controls.html"><strong aria-hidden="true">3.4.3.</strong> System Controls</a></li></ol></li><li class="chapter-item expanded "><a href="bt/profiles/index.html"><strong aria-hidden="true">3.5.</strong> BT device profiles</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="bt/profiles/upload.html"><strong aria-hidden="true">3.5.1.</strong> Upload custom device profile</a></li></ol></li><li class="chapter-item expanded "><a href="bt/devices/index.html"><strong aria-hidden="true">3.6.</strong> BT device test reports</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="bt/devices/Android.html"><strong aria-hidden="true">3.6.1.</strong> Android</a></li><li class="chapter-item expanded "><a href="bt/devices/AppleTV.html"><strong aria-hidden="true">3.6.2.</strong> AppleTV</a></li><li class="chapter-item expanded "><a href="bt/devices/Google-Chromecast.html"><strong aria-hidden="true">3.6.3.</strong> Google Chromecast</a></li><li class="chapter-item expanded "><a href="bt/devices/LG-WebOS.html"><strong aria-hidden="true">3.6.4.</strong> LG WebOS</a></li><li class="chapter-item expanded "><a href="bt/devices/onn-StreamingDevice.html"><strong aria-hidden="true">3.6.5.</strong> onn. Streaming Device</a></li><li class="chapter-item expanded "><a href="bt/devices/Samsung-SmartMonitor.html"><strong aria-hidden="true">3.6.6.</strong> Samsung Smart Monitor</a></li></ol></li></ol></li><li class="chapter-item expanded "><li class="part-title">Entity Documentation</li><li class="chapter-item expanded "><a href="entities/index.html"><strong aria-hidden="true">4.</strong> Entities</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="entities/entity_button.html"><strong aria-hidden="true">4.1.</strong> Button</a></li><li class="chapter-item expanded "><a href="entities/entity_switch.html"><strong aria-hidden="true">4.2.</strong> Switch</a></li><li class="chapter-item expanded "><a href="entities/entity_climate.html"><strong aria-hidden="true">4.3.</strong> Climate</a></li><li class="chapter-item expanded "><a href="entities/entity_cover.html"><strong aria-hidden="true">4.4.</strong> Cover</a></li><li class="chapter-item expanded "><a href="entities/entity_light.html"><strong aria-hidden="true">4.5.</strong> Light</a></li><li class="chapter-item expanded "><a href="entities/entity_media_player.html"><strong aria-hidden="true">4.6.</strong> Media Player</a></li><li class="chapter-item expanded "><a href="entities/entity_remote.html"><strong aria-hidden="true">4.7.</strong> Remote</a></li><li class="chapter-item expanded "><a href="entities/entity_sensor.html"><strong aria-hidden="true">4.8.</strong> Sensor</a></li><li class="chapter-item expanded "><a href="entities/entity_ir_emitter.html"><strong aria-hidden="true">4.9.</strong> IR-Emitter</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">Integration Drivers</li><li class="chapter-item expanded "><a href="integration-driver/index.html"><strong aria-hidden="true">5.</strong> Integration Drivers</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="integration-driver/write-integration-driver.html"><strong aria-hidden="true">5.1.</strong> How to write an integration driver</a></li><li class="chapter-item expanded "><a href="integration-driver/websocket.html"><strong aria-hidden="true">5.2.</strong> WebSockets handling</a></li><li class="chapter-item expanded "><a href="integration-driver/driver-advertisement.html"><strong aria-hidden="true">5.3.</strong> Driver mDNS advertisement</a></li><li class="chapter-item expanded "><a href="integration-driver/driver-registration.html"><strong aria-hidden="true">5.4.</strong> Driver registration</a></li><li class="chapter-item expanded "><a href="integration-driver/driver-setup.html"><strong aria-hidden="true">5.5.</strong> Driver setup</a></li><li class="chapter-item expanded "><a href="integration-driver/driver-installation.html"><strong aria-hidden="true">5.6.</strong> Install integration driver on the device</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
