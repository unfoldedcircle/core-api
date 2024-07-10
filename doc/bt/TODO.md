## Restrictions and missing features

- Number of BT connections / devices is restricted to 1 by default. Multiple Bluetooth LE connections can be enabled under "Settings, Development: Preview features".
- The Bluetooth controller is put to sleep in system standby and re-initialized at wakeup.
  - Some devices will show a disconnect & connect message or popup when the remote wakes up.
  - Different sleep behaviour can only be configured with the REST Core-API at the moment. Instructions will be published.
- Dock Bluetooth setup is not yet implemented with the new Bluetooth stack.
- Only US-ASCII character map (other languages will likely have KEY_Z / KEY_Y switched and non-letter & digit keys mapped to something else).
- Entity state handling is not yet fully implemented, only UNAVAILABLE (if not connected) and UNKNOWN (when connected) are currently used.
- Power state handling is not yet implemented if the device supports dedicated power on & off commands. Command mapping is prepared in the BT device profile files.
- Native key repeat is not yet implemented. Pressing & holding a button will send individual key presses.
  - BT remote-entity send_cmd command parameters repeat, delay, hold are ignored.
- Web-configurator requires manual refresh:
  - after the pairing confirmation, otherwise it still shows as not paired.
  - after deleting a paired device, otherwise it still shows paired.
- Pairing information is not included in backup archive.
- Entity command validation issue in `send_cmd` & `send_key` commands with negative mouse movement values.

See [known device issues](known_issues.md) for more information.