# BT suspend / wakeup patterns

When the remote goes into deep sleep mode, the Bluetooth controller is put to sleep and re-initialized at wakeup.
- Some devices will show a disconnect & connect message or popup when the remote wakes up.
- Different sleep behaviour can only be configured with the REST Core-API at the moment.
- Default suspend actions if not defined (empty array): disable advertisements, then put BT controller to sleep
- Default wakeup actions if not defined (empty array): restart BT controller

```shell
curl --location --request PATCH 'http://$IP/api/cfg/bt' \
--header 'Content-Type: application/json' \
--user 'web-configurator:$PIN' \
--data '{
    "suspend_actions": ["DISABLE_ADVERTISEMENTS", "SLEEP"],
    "wakeup_actions": ["RESTART"]
}'
```

## Do nothing, best effort

```json
{
  "suspend_actions": ["NONE"],
  "wakeup_actions": ["NONE"]
}
```

- keeps connection during sleep
- fastest way to send key commands after wakeup (if connection is still alive)
- least reliable with certain devices
- connection might hang after wakeup: R2 shows connected, no error while sending keys, but central shows disconnected
- does not work if central is restarted while R2 is suspended


## Disconnect connections at wakeup

```json
{
  "suspend_actions": ["NONE"],
  "wakeup_actions": ["DISCONNECT"]
}
```

- trigger central reconnection at wakeup
- more reliable than best effort
- some devices will show "connected" & "disconnected" popups after wakeup


## Restart at wakeup

```json
{
  "suspend_actions": ["NONE"],
  "wakeup_actions": ["RESTART"]
}
```

- keeps connection during sleep
- restart at wakeup to cleanly reconnect centrals
- small chance that central considers connection as non-working
- some devices will show "connected" & "disconnected" popups after wakeup


## HCI sleep mode, restart at wakeup

```json
{
  "suspend_actions": ["DISABLE_ADVERTISEMENTS", "SLEEP"],
  "wakeup_actions": ["RESTART"]
}
```

- disconnect central before HCI sleep mode
- restart at wakeup to cleanly reconnect centrals
- seems to be the most reliable option that centrals reconnect
- some devices will show "connected" popup at sleep & "disconnected" popup after wakeup


## HCI sleep mode & resume at wakeup

About 1 sec faster than restart (~ 3sec).

```json
{
  "suspend_actions": ["DISABLE_ADVERTISEMENTS", "SLEEP"],
  "wakeup_actions": ["ENABLE", "ENABLE_ADVERTISEMENTS"]
}
```

- disconnect central before HCI sleep mode
- startup BT controller at wakeup and re-enable advertisements for centrals to reconnect
- some devices will show "connected" popup at sleep & "disconnected" popup after wakeup
