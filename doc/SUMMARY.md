# Summary

[Introduction](README.md)

# Developer Guide

- [Remote Two user interface](remote-ui.md)
- [Remote Two DNS-SD lookup](discovery.md)

# Entity Documentation

- [Entities](entities/README.md)
  - [Button](entities/entity_button.md)
  - [Switch](entities/entity_switch.md)
  - [Climate](entities/entity_climate.md)
  - [Cover](entities/entity_cover.md)
  - [Light](entities/entity_light.md)
  - [Media Player](entities/entity_media_player.md)
  - [Remote](entities/entity_remote.md)
  - [Sensor](entities/entity_sensor.md)
  - [IR-Emitter](entities/entity_ir_emitter.md)
  - [Select](entities/entity_select.md)
  - [Voice Assistant](entities/entity_voice_assistant.md)

# Integration Drivers

- [Integration Drivers](integration-driver/README.md)
  - [How to write an integration driver](integration-driver/write-integration-driver.md)
  - [WebSockets handling](integration-driver/websocket.md)
  - [Driver mDNS advertisement](integration-driver/driver-advertisement.md)
  - [Driver registration](integration-driver/driver-registration.md)
  - [Driver setup](integration-driver/driver-setup.md)
  - [Install integration driver on the device](integration-driver/driver-installation.md)

# Bluetooth

- [Bluetooth HID peripheral support](bt/README.md)
    - [Restrictions and missing features](bt/TODO.md)
    - [Known issues](bt/known_issues.md)
    - [BT suspend / wakeup patterns](bt/suspend_behaviour.md)
    - [Virtual keyboard](bt/virtual_keyboard.md)
        - [Regular keycodes](bt/hid_keycodes.md)
        - [Consumer codes](bt/hid_consumer.md)
        - [System Controls](bt/hid_system_controls.md)
    - [BT device profiles](bt/profiles/README.md)
        - [Upload custom device profile](bt/profiles/upload.md)
    - [BT device test reports](bt/devices/README.md)
        - [Android](bt/devices/Android.md)
        - [AppleTV](bt/devices/AppleTV.md)
        - [Google Chromecast](bt/devices/Google-Chromecast.md)
        - [LG WebOS](bt/devices/LG-WebOS.md)
        - [onn. Streaming Device](bt/devices/onn-StreamingDevice.md)
        - [Samsung Smart Monitor](bt/devices/Samsung-SmartMonitor.md)
