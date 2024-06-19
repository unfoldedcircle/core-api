# Google Chromecast HD & Ultra

- Based on generic Android device.
- Tested with Google Chromecast HD, running Android TV 12 (STTE.240315.002)

## Known issues

- YouTube and Netflix buttons could not be found.
  - Workaround: use [Button Mapper: Remap your keys](https://play.google.com/store/apps/details?id=flar2.homebutton)
    or a similar app to remap buttons and add a shortcut for these apps.
  - Note: YouTube button is identified as BUTTON_3 (190), Netflix button as BUTTON_4 (191). According to
    [Android's KeyEvent class](https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/view/KeyEvent.java)
    these should be "Generic Game Pad Button #3 & #4".
  - This project had no luck either: <https://github.com/designer-living/pi-usb-gadget-controller/blob/main/ANDROID_MAPPING.md>

## Regular keycodes (Keyboard Keypad Page (0x07))

| Key name                | Usage code | OK | Description                                                                        |
|-------------------------|------------|----|------------------------------------------------------------------------------------|
| KEY_A                   | 4          | x  | [^1]                                                                               |
| KEY_B                   | 5          | x  | [^1]                                                                               |
| KEY_C                   | 6          | x  | [^1]                                                                               |
| KEY_D                   | 7          | x  | [^1]                                                                               |
| KEY_E                   | 8          | x  | [^1]                                                                               |
| KEY_F                   | 9          | x  | [^1]                                                                               |
| KEY_G                   | 10         | x  | [^1]                                                                               |
| KEY_H                   | 11         | x  | [^1]                                                                               |
| KEY_I                   | 12         | x  | [^1]                                                                               |
| KEY_J                   | 13         | x  | [^1]                                                                               |
| KEY_K                   | 14         | x  | [^1]                                                                               |
| KEY_L                   | 15         | x  | [^1]                                                                               |
| KEY_M                   | 16         | x  | [^1]                                                                               |
| KEY_N                   | 17         | x  | [^1]                                                                               |
| KEY_O                   | 18         | x  | [^1]                                                                               |
| KEY_P                   | 19         | x  | [^1]                                                                               |
| KEY_Q                   | 20         | x  | [^1]                                                                               |
| KEY_R                   | 21         | x  | [^1]                                                                               |
| KEY_S                   | 22         | x  | [^1]                                                                               |
| KEY_T                   | 23         | x  | [^1]                                                                               |
| KEY_U                   | 24         | x  | [^1]                                                                               |
| KEY_V                   | 25         | x  | [^1]                                                                               |
| KEY_W                   | 26         | x  | [^1]                                                                               |
| KEY_X                   | 27         | x  | [^1]                                                                               |
| KEY_Y                   | 28         | x  | [^1]                                                                               |
| KEY_Z                   | 29         | x  | [^1]                                                                               |
| KEY_1                   | 30         | x  | [^1]                                                                               |
| KEY_2                   | 31         | x  | [^1]                                                                               |
| KEY_3                   | 32         | x  | [^1]                                                                               |
| KEY_4                   | 33         | x  | [^1]                                                                               |
| KEY_5                   | 34         | x  | [^1]                                                                               |
| KEY_6                   | 35         | x  | [^1]                                                                               |
| KEY_7                   | 36         | x  | [^1]                                                                               |
| KEY_8                   | 37         | x  | [^1]                                                                               |
| KEY_9                   | 38         | x  | [^1]                                                                               |
| KEY_0                   | 39         | x  | [^1]                                                                               |
| KEY_RETURN              | 40         | x  | Navigation select (same as KEYPAD_ENTER)                                           |
| KEY_ESC                 | 41         | x  | Navigation go back (mostly). Better use CONSUMER_AC_BACK to return from all menus! |
| KEY_BACKSPACE           | 42         | x  | [^1]                                                                               |
| KEY_TAB                 | 43         | x  | Plex: next UI element                                                              |
| KEY_SPACE               | 44         | x  | [^1]                                                                               |
| KEY_MINUS               | 45         | x  | [^1]                                                                               |
| KEY_EQUAL               | 46         | x  | [^1]                                                                               |
| KEY_LEFT_BRACE          | 47         | x  | [^1]                                                                               |
| KEY_RIGHT_BRACE         | 48         | x  | [^1]                                                                               |
| KEY_BACKSLASH           | 49         | x  | [^1]                                                                               |
| KEY_HASH_TILDE          | 50         | x  | [^1]                                                                               |
| KEY_SEMICOLON           | 51         | x  | [^1]                                                                               |
| KEY_APOSTROPHE          | 52         | x  | [^1]                                                                               |
| KEY_GRAVE               | 53         | x  | [^1]                                                                               |
| KEY_COMMA               | 54         | x  | [^1]                                                                               |
| KEY_DOT                 | 55         | x  | [^1]                                                                               |
| KEY_SLASH               | 56         | x  | [^1]                                                                               |
| KEY_CAPSLOCK            | 57         | x  |                                                                                    |
| KEY_F1                  | 58         | x  |                                                                                    |
| KEY_F2                  | 59         | x  |                                                                                    |
| KEY_F3                  | 60         | x  |                                                                                    |
| KEY_F4                  | 61         | x  |                                                                                    |
| KEY_F5                  | 62         | x  |                                                                                    |
| KEY_F6                  | 63         | x  |                                                                                    |
| KEY_F7                  | 64         | x  |                                                                                    |
| KEY_F8                  | 65         | x  |                                                                                    |
| KEY_F9                  | 66         | x  |                                                                                    |
| KEY_F10                 | 67         | x  |                                                                                    |
| KEY_F11                 | 68         | x  |                                                                                    |
| KEY_F12                 | 69         | x  |                                                                                    |
| KEY_SYSRQ               | 70         | x  |                                                                                    |
| KEY_SCROLL_LOCK         | 71         | x  |                                                                                    |
| KEY_PAUSE               | 72         | x  |                                                                                    |
| KEY_INSERT              | 73         | x  |                                                                                    |
| KEY_HOME                | 74         | x  | Scroll to start of list                                                            |
| KEY_PAGE_UP             | 75         | x  | Scroll list                                                                        |
| KEY_DELETE              | 76         | x  | [^1]                                                                               |
| KEY_END                 | 77         | x  | Scroll to end of list                                                              |
| KEY_PAGE_DOWN           | 78         | x  | Scroll list                                                                        |
| KEY_RIGHT_ARROW         | 79         | x  | Menu navigation                                                                    |
| KEY_LEFT_ARROW          | 80         | x  | Menu navigation                                                                    |
| KEY_DOWN_ARROW          | 81         | x  | Menu navigation                                                                    |
| KEY_UP_ARROW            | 82         | x  | Menu navigation                                                                    |
| KEYPAD_NUMLOCK          | 83         | x  |                                                                                    |
| KEYPAD_SLASH            | 84         | x  |                                                                                    |
| KEYPAD_ASTERISK         | 85         | x  |                                                                                    |
| KEYPAD_MINUS            | 86         | x  |                                                                                    |
| KEYPAD_PLUS             | 87         | x  |                                                                                    |
| KEYPAD_ENTER            | 88         | x  | Navigation select                                                                  |
| KEYPAD_1                | 89         | x  |                                                                                    |
| KEYPAD_2                | 90         | x  |                                                                                    |
| KEYPAD_3                | 91         | x  |                                                                                    |
| KEYPAD_4                | 92         | x  |                                                                                    |
| KEYPAD_5                | 93         | x  |                                                                                    |
| KEYPAD_6                | 94         | x  |                                                                                    |
| KEYPAD_7                | 95         | x  |                                                                                    |
| KEYPAD_8                | 96         | x  |                                                                                    |
| KEYPAD_9                | 97         | x  |                                                                                    |
| KEYPAD_0                | 98         | x  |                                                                                    |
| KEYPAD_DOT              | 99         | x  |                                                                                    |
| KEY_102ND               | 100        | -  | Recognized as BACKSLASH                                                            |
| KEY_APPLICATION         | 101        | x  | Context menu (long press select on original remote)                                |
| KEY_POWER               | 102        | x  | Sleep & Wakeup                                                                     |
| KEYPAD_EQUAL            | 103        | x  |                                                                                    |
| KEY_F13                 | 104        | -  | [^3]                                                                               |
| KEY_F14                 | 105        | -  | [^3]                                                                               |
| KEY_F15                 | 106        | -  | [^3]                                                                               |
| KEY_F16                 | 107        | -  | [^3]                                                                               |
| KEY_F17                 | 108        | -  | [^3]                                                                               |
| KEY_F18                 | 109        | -  | [^3]                                                                               |
| KEY_F19                 | 110        | -  | [^3]                                                                               |
| KEY_F20                 | 111        | -  | [^3]                                                                               |
| KEY_F21                 | 112        | -  | [^3]                                                                               |
| KEY_F22                 | 113        | -  | [^3]                                                                               |
| KEY_F23                 | 114        | -  | [^3]                                                                               |
| KEY_F24                 | 115        | -  | [^3]                                                                               |
| KEY_EXECUTE             | 116        | -  | [^3]                                                                               |
| KEY_HELP                | 117        | -  | [^3]                                                                               |
| KEY_MENU                | 118        | -  | [^3]                                                                               |
| KEY_SELECT              | 119        | -  | [^3]                                                                               |
| KEY_STOP                | 120        | x  | MEDIA_STOP                                                                         |
| KEY_AGAIN               | 121        | -  | [^3]                                                                               |
| KEY_UNDO                | 122        | -  | [^3]                                                                               |
| KEY_CUT                 | 123        | x  | [^2]                                                                               |
| KEY_COPY                | 124        | x  | [^2]                                                                               |
| KEY_PASTE               | 125        | x  | [^2]                                                                               |
| KEY_FIND                | 126        | -  | [^3]                                                                               |
| KEY_MUTE                | 127        | x  |                                                                                    |
| KEY_VOLUME_UP           | 128        | x  |                                                                                    |
| KEY_VOLUME_DOWN         | 129        | x  |                                                                                    |
| KEYPAD_COMMA            | 133        | x  |                                                                                    |
| KEY_RO                  | 135        | x  | [^2]                                                                               |
| KEY_KATAKANA_HIRAGANA   | 136        | x  | [^2]                                                                               |
| KEY_YEN                 | 137        | x  | [^2]                                                                               |
| KEY_HENKAN              | 138        | x  | [^2]                                                                               |
| KEY_MUHENKAN            | 139        | x  | [^2]                                                                               |
| KEYPAD_JPCOMMA          | 140        | -  | Same as KEYPAD_COMMA                                                               |
| KEY_INTERNATIONAL7      | 141        | -  | [^3]                                                                               |
| KEY_INTERNATIONAL8      | 142        | -  | [^3]                                                                               |
| KEY_INTERNATIONAL9      | 143        | -  | [^3]                                                                               |
| KEY_HANGEUL             | 144        | x  | KANA [^2]                                                                          |
| KEY_HANJA               | 145        | x  | EISU [^2]                                                                          |
| KEY_KATAKANA            | 146        | -  | [^3]                                                                               |
| KEY_HIRAGANA            | 147        | -  | [^3]                                                                               |
| KEY_ZENKAKU_HANKAKU     | 148        | x  | [^2]                                                                               |
| KEY_FURIGANA            | 149        | -  | [^3]                                                                               |
| KEY_LANG7               | 150        | -  | [^3]                                                                               |
| KEY_LANG8               | 151        | -  | [^3]                                                                               |
| KEY_LANG9               | 152        | -  | [^3]                                                                               |
| KEY_LEFT_CONTROL        | 224        |    |                                                                                    |
| KEY_LEFT_SHIFT          | 225        |    |                                                                                    |
| KEY_LEFT_ALT            | 226        |    |                                                                                    |
| KEY_LEFT_GUI            | 227        |    |                                                                                    |
| KEY_RIGHT_CONTROL       | 228        |    |                                                                                    |
| KEY_RIGHT_SHIFT         | 229        |    |                                                                                    |
| KEY_RIGHT_ALT           | 230        |    |                                                                                    |
| KEY_RIGHT_GUI           | 231        |    |                                                                                    |
| KEY_MEDIA_PLAY_PAUSE    | 232        | -  | [^3]                                                                               |
| KEY_MEDIA_STOP_CD       | 233        | -  | [^3]                                                                               |
| KEY_MEDIA_PREVIOUS_SONG | 234        | -  | [^3]                                                                               |
| KEY_MEDIA_NEXT_SONG     | 235        | -  | [^3]                                                                               |
| KEY_MEDIA_EJECT_CD      | 236        | -  | [^3]                                                                               |
| KEY_MEDIA_VOLUME_UP     | 237        | -  | [^3]                                                                               |
| KEY_MEDIA_VOLUME_DOWN   | 238        | -  | [^3]                                                                               |
| KEY_MEDIA_MUTE          | 239        | -  | [^3]                                                                               |
| KEY_MEDIA_WWW           | 240        | -  | [^3]                                                                               |
| KEY_MEDIA_BACK          | 241        | -  | [^3]                                                                               |
| KEY_MEDIA_FORWARD       | 242        | -  | [^3]                                                                               |
| KEY_MEDIA_STOP          | 243        | -  | [^3]                                                                               |
| KEY_MEDIA_FIND          | 244        | -  | [^3]                                                                               |
| KEY_MEDIA_SCROLL_UP     | 245        | -  | [^3]                                                                               |
| KEY_MEDIA_SCROLL_DOWN   | 246        | -  | [^3]                                                                               |
| KEY_MEDIA_EDIT          | 247        | -  | [^3]                                                                               |
| KEY_MEDIA_SLEEP         | 248        | -  | [^3]                                                                               |
| KEY_MEDIA_COFFEE        | 249        | -  | [^3]                                                                               |
| KEY_MEDIA_REFRESH       | 250        | -  | [^3]                                                                               |
| KEY_MEDIA_CALC          | 251        | -  | [^3]                                                                               |

## Consumer codes (Consumer Page (0x0C))

| key name                                            | usage code | OK | Description                                                                                  |
|-----------------------------------------------------|------------|----|----------------------------------------------------------------------------------------------|
| CONSUMER_INCREMENT_10                               | 0x020      | -  | [^4]                                                                                         |
| CONSUMER_INCREMENT_100                              | 0x021      | -  | [^4]                                                                                         |
| CONSUMER_AM_PM                                      | 0x022      | -  | [^4]                                                                                         |
| CONSUMER_POWER                                      | 0x030      | x  | Power toggle                                                                                 |
| CONSUMER_RESET                                      | 0x031      | -  | Wakes up device, otherwise doesn't seem to have a function                                   |
| CONSUMER_SLEEP                                      | 0x032      | x  | Puts device to sleep, but doesn't wake it up when pressed again                              |
| CONSUMER_SLEEP_AFTER                                | 0x033      | -  | [^4]                                                                                         |
| CONSUMER_SLEEP_MODE                                 | 0x034      | x  | Puts device to sleep, but doesn't wake it up when pressed again                              |
| CONSUMER_ILLUMINATION                               | 0x035      | -  | [^3]                                                                                         |
| CONSUMER_FUNCTION_BUTTONS                           | 0x036      | x  | [^2] BUTTON_1                                                                                |
| CONSUMER_MENU                                       | 0x040      | x  | Main screen: context menu (long press select on original remote). Plex: reset customizations |
| CONSUMER_MENU_PICK                                  | 0x041      | x  | Select                                                                                       |
| CONSUMER_MENU_UP                                    | 0x042      | x  | Navigation                                                                                   |
| CONSUMER_MENU_DOWN                                  | 0x043      | x  | Navigation                                                                                   |
| CONSUMER_MENU_LEFT                                  | 0x044      | x  | Navigation                                                                                   |
| CONSUMER_MENU_RIGHT                                 | 0x045      | x  | Navigation                                                                                   |
| CONSUMER_MENU_ESCAPE                                | 0x046      | x  | Plex: exit popup menu. NOK: Spotify                                                          |
| CONSUMER_MENU_VALUE_INCREASE                        | 0x047      | x  | [^2] NUMPAD_ADD                                                                              |
| CONSUMER_MENU_VALUE_DECREASE                        | 0x048      | x  | [^2] NUMPAD_SUBTRACT                                                                         |
| CONSUMER_DATA_ON_SCREEN                             | 0x060      | -  | [^3]                                                                                         |
| CONSUMER_CLOSED_CAPTION                             | 0x061      | x  | [^2] CAPTIONS                                                                                |
| CONSUMER_CLOSED_CAPTION_SELECT                      | 0x062      | -  | [^4]                                                                                         |
| CONSUMER_VCR_TV                                     | 0x063      | -  | [^3]                                                                                         |
| CONSUMER_BROADCAST_MODE                             | 0x064      | -  | [^4]                                                                                         |
| CONSUMER_SNAPSHOT                                   | 0x065      | x  | [^2] CAMERA                                                                                  |
| CONSUMER_STILL                                      | 0x066      | -  | [^4]                                                                                         |
| CONSUMER_PICTURE_IN_PICTURE_TOGGLE                  | 0x067      | -  | [^4]                                                                                         |
| CONSUMER_PICTURE_IN_PICTURE_SWAP                    | 0x068      | -  | [^4]                                                                                         |
| CONSUMER_RED_MENU_BUTTON                            | 0x069      | x  |                                                                                              |
| CONSUMER_GREEN_MENU_BUTTON                          | 0x06A      | x  |                                                                                              |
| CONSUMER_BLUE_MENU_BUTTON                           | 0x06B      | x  |                                                                                              |
| CONSUMER_YELLOW_MENU_BUTTON                         | 0x06C      | x  |                                                                                              |
| CONSUMER_ASPECT                                     | 0x06D      | -  | [^3]                                                                                         |
| CONSUMER_MODE_SELECT_3D                             | 0x06E      | -  | [^4]                                                                                         |
| CONSUMER_DISPLAY_BRIGHTNESS_INCREMENT               | 0x06F      | x  | Brightness slider, exit with CONSUMER_AC_BACK                                                |
| CONSUMER_DISPLAY_BRIGHTNESS_DECREMENT               | 0x070      | x  | "                                                                                            |
| CONSUMER_DISPLAY_BRIGHTNESS                         | 0x071      | -  | [^4]                                                                                         |
| CONSUMER_DISPLAY_BACKLIGHT_TOGGLE                   | 0x072      | -  | [^3]                                                                                         |
| CONSUMER_DISPLAY_SET_BRIGHTNESS_TO_MINIMUM          | 0x073      | -  | [^3]                                                                                         |
| CONSUMER_DISPLAY_SET_BRIGHTNESS_TO_MAXIMUM          | 0x074      | -  | [^3]                                                                                         |
| CONSUMER_DISPLAY_SET_AUTO_BRIGHTNESS                | 0x075      | -  | [^3]                                                                                         |
| CONSUMER_CAMERA_ACCESS_ENABLED                      | 0x076      | -  | [^4]                                                                                         |
| CONSUMER_CAMERA_ACCESS_DISABLED                     | 0x077      | -  | [^4]                                                                                         |
| CONSUMER_CAMERA_ACCESS_TOGGLE                       | 0x078      | -  | [^4]                                                                                         |
| CONSUMER_KEYBOARD_BRIGHTNESS_INCREMENT              | 0x079      | -  | [^3]                                                                                         |
| CONSUMER_KEYBOARD_BRIGHTNESS_DECREMENT              | 0x07A      | -  | [^3]                                                                                         |
| CONSUMER_KEYBOARD_BACKLIGHT_SET_LEVEL               | 0x07B      | -  | [^4]                                                                                         |
| CONSUMER_KEYBOARD_BACKLIGHT_OOC                     | 0x07C      | -  | [^3]                                                                                         |
| CONSUMER_KEYBOARD_BACKLIGHT_SET_MINIMUM             | 0x07D      | -  | [^4]                                                                                         |
| CONSUMER_KEYBOARD_BACKLIGHT_SET_MAXIMUM             | 0x07E      | -  | [^4]                                                                                         |
| CONSUMER_KEYBOARD_BACKLIGHT_AUTO                    | 0x07F      | -  | [^4]                                                                                         |
| CONSUMER_SELECTION                                  | 0x080      | -  | [^4]                                                                                         |
| CONSUMER_ASSIGN_SELECTION                           | 0x081      | -  | [^4]                                                                                         |
| CONSUMER_MODE_STEP                                  | 0x082      | -  | [^3]                                                                                         |
| CONSUMER_RECALL_LAST                                | 0x083      | x  | [^2] LAST_CHANNEL                                                                            |
| CONSUMER_ENTER_CHANNEL                              | 0x084      | x  | [^2] ENTER                                                                                   |
| CONSUMER_ORDER_MOVIE                                | 0x085      | -  | [^4]                                                                                         |
| CONSUMER_CHANNEL                                    | 0x086      | -  | [^4]                                                                                         |
| CONSUMER_MEDIA_SELECTION                            | 0x087      | -  | [^4]                                                                                         |
| CONSUMER_MEDIA_SELECT_COMPUTER                      | 0x088      | -  | [^3]                                                                                         |
| CONSUMER_MEDIA_SELECT_TV                            | 0x089      | x  | [^2] TV                                                                                      |
| CONSUMER_MEDIA_SELECT_WWW                           | 0x08A      | x  | [^2] EXPLORER                                                                                |
| CONSUMER_MEDIA_SELECT_DVD                           | 0x08B      | -  | [^3]                                                                                         |
| CONSUMER_MEDIA_SELECT_TELEPHONE                     | 0x08C      | -  | Crashes or resets device                                                                     |
| CONSUMER_MEDIA_SELECT_PROGRAM_GUIDE                 | 0x08D      | x  | [^2] GUIDE                                                                                   |
| CONSUMER_MEDIA_SELECT_VIDEO_PHONE                   | 0x08E      | -  | [^3]                                                                                         |
| CONSUMER_MEDIA_SELECT_GAMES                         | 0x08F      | -  | [^3]                                                                                         |
| CONSUMER_MEDIA_SELECT_MESSAGES                      | 0x090      | -  | [^3]                                                                                         |
| CONSUMER_MEDIA_SELECT_CD                            | 0x091      | -  | [^3]                                                                                         |
| CONSUMER_MEDIA_SELECT_VCR                           | 0x092      | -  | [^3]                                                                                         |
| CONSUMER_MEDIA_SELECT_TUNER                         | 0x093      | -  | [^3]                                                                                         |
| CONSUMER_QUIT                                       | 0x094      | -  | [^3]                                                                                         |
| CONSUMER_HELP                                       | 0x095      | -  | [^3]                                                                                         |
| CONSUMER_MEDIA_SELECT_TAPE                          | 0x096      | -  | [^3]                                                                                         |
| CONSUMER_MEDIA_SELECT_CABLE                         | 0x097      | -  | [^3]                                                                                         |
| CONSUMER_MEDIA_SELECT_SATELLITE                     | 0x098      | -  | [^3]                                                                                         |
| CONSUMER_MEDIA_SELECT_SECURITY                      | 0x099      | -  | [^4]                                                                                         |
| CONSUMER_MEDIA_SELECT_HOME                          | 0x09A      | x  | [^2] DVR                                                                                     |
| CONSUMER_MEDIA_SELECT_CALL                          | 0x09B      | -  | [^4]                                                                                         |
| CONSUMER_CHANNEL_INCREMENT                          | 0x09C      | x  | [^2] CHANNEL_UP                                                                              |
| CONSUMER_CHANNEL_DECREMENT                          | 0x09D      | x  | [^2] CHANNEL_DOWN                                                                            |
| CONSUMER_MEDIA_SELECT_SAP                           | 0x09E      | -  | [^4]                                                                                         |
| CONSUMER_VCR_PLUS                                   | 0x0A0      | -  | [^3]                                                                                         |
| CONSUMER_ONCE                                       | 0x0A1      | -  | [^4]                                                                                         |
| CONSUMER_DAILY                                      | 0x0A2      | -  | [^4]                                                                                         |
| CONSUMER_WEEKLY                                     | 0x0A3      | -  | [^4]                                                                                         |
| CONSUMER_MONTHLY                                    | 0x0A4      | -  | [^4]                                                                                         |
| CONSUMER_PLAY                                       | 0x0B0      | x  | Plex: Play / Pause. Spotify: Play                                                            |
| CONSUMER_PAUSE                                      | 0x0B1      | x  | Plex: show overlay menu                                                                      |
| CONSUMER_RECORD                                     | 0x0B2      | x  | Plex: record TV                                                                              |
| CONSUMER_FAST_FORWARD                               | 0x0B3      | x  | Spotify: FF, Plex: skip forward                                                              |
| CONSUMER_REWIND                                     | 0x0B4      | x  | Spotify: RW, Plex: skip backwards                                                            |
| CONSUMER_SCAN_NEXT_TRACK                            | 0x0B5      | x  | Next track (tested in Spotify)                                                               |
| CONSUMER_SCAN_PREVIOUS_TRACK                        | 0x0B6      | x  | Previous track (tested in Spotify)                                                           |
| CONSUMER_STOP                                       | 0x0B7      | x  | Spotify: Stop                                                                                |
| CONSUMER_EJECT                                      | 0x0B8      | x  | MEDIA_EJECT                                                                                  |
| CONSUMER_RANDOM_PLAY                                | 0x0B9      | -  | [^3]                                                                                         |
| CONSUMER_SELECT_DISC                                | 0x0BA      | -  | [^4]                                                                                         |
| CONSUMER_ENTER_DISC                                 | 0x0BB      | -  | [^4]                                                                                         |
| CONSUMER_REPEAT                                     | 0x0BC      | -  | [^3]                                                                                         |
| CONSUMER_TRACKING                                   | 0x0BD      | -  | [^4]                                                                                         |
| CONSUMER_TRACK_NORMAL                               | 0x0BE      | -  | [^4]                                                                                         |
| CONSUMER_SLOW_TRACKING                              | 0x0BF      | -  | [^3]                                                                                         |
| CONSUMER_FRAME_FORWARD                              | 0x0C0      | -  | [^4]                                                                                         |
| CONSUMER_FRAME_BACK                                 | 0x0C1      | -  | [^4]                                                                                         |
| CONSUMER_MARK                                       | 0x0C2      | -  | [^4]                                                                                         |
| CONSUMER_CLEAR_MARK                                 | 0x0C3      | -  | [^4]                                                                                         |
| CONSUMER_REPEAT_FROM_MARK                           | 0x0C4      | -  | [^4]                                                                                         |
| CONSUMER_RETURN_TO_MARK                             | 0x0C5      | -  | [^4]                                                                                         |
| CONSUMER_SEARCH_MARK_FORWARD                        | 0x0C6      | -  | [^4]                                                                                         |
| CONSUMER_SEARCH_MARK_BACKWARDS                      | 0x0C7      | -  | [^4]                                                                                         |
| CONSUMER_COUNTER_RESET                              | 0x0C8      | -  | [^4]                                                                                         |
| CONSUMER_SHOW_COUNTER                               | 0x0C9      | -  | [^4]                                                                                         |
| CONSUMER_TRACKING_INCREMENT                         | 0x0CA      | -  | [^4]                                                                                         |
| CONSUMER_TRACKING_DECREMENT                         | 0x0CB      | -  | [^4]                                                                                         |
| CONSUMER_STOP_EJECT                                 | 0x0CC      | -  | [^4]                                                                                         |
| CONSUMER_PLAY_PAUSE                                 | 0x0CD      | x  | Plex, Spotify                                                                                |
| CONSUMER_PLAY_SKIP                                  | 0x0CE      | -  | [^4]                                                                                         |
| CONSUMER_VOICE_COMMAND                              | 0x0CF      | x  | Voice assistant                                                                              |
| CONSUMER_INVOKE_CAPTURE_INTERFACE                   | 0x0D0      | -  | [^4]                                                                                         |
| CONSUMER_START_OR_STOP_GAME_RECORDING               | 0x0D1      | -  | [^4]                                                                                         |
| CONSUMER_HISTORICAL_GAME_CAPTURE                    | 0x0D2      | -  | [^4]                                                                                         |
| CONSUMER_CAPTURE_GAME_SCREENSHOT                    | 0x0D3      | -  | [^4]                                                                                         |
| CONSUMER_SHOW_OR_HIDE_RECORDING_INDICATOR           | 0x0D4      | -  | [^4]                                                                                         |
| CONSUMER_START_OR_STOP_MICROPHONE_CAPTURE           | 0x0D5      | -  | [^4]                                                                                         |
| CONSUMER_START_OR_STOP_CAMERA_CAPTURE               | 0x0D6      | -  | [^4]                                                                                         |
| CONSUMER_START_OR_STOP_GAME_BROADCAST               | 0x0D7      | -  | [^4]                                                                                         |
| CONSUMER_VOLUME                                     | 0x0E0      | -  |                                                                                              |
| CONSUMER_BALANCE                                    | 0x0E1      | -  | [^4]                                                                                         |
| CONSUMER_MUTE                                       | 0x0E2      | x  |                                                                                              |
| CONSUMER_BASS                                       | 0x0E3      | -  | [^4]                                                                                         |
| CONSUMER_TREBLE                                     | 0x0E4      | -  | [^4]                                                                                         |
| CONSUMER_BASS_BOOST                                 | 0x0E5      | -  | [^3]                                                                                         |
| CONSUMER_SURROUND_MODE                              | 0x0E6      | -  | [^4]                                                                                         |
| CONSUMER_LOUDNESS                                   | 0x0E7      | -  | [^4]                                                                                         |
| CONSUMER_MPX                                        | 0x0E8      | -  | [^4]                                                                                         |
| CONSUMER_VOLUME_INCREMENT                           | 0x0E9      | x  |                                                                                              |
| CONSUMER_VOLUME_DECREMENT                           | 0x0EA      | x  |                                                                                              |
| CONSUMER_SPEED_SELECT                               | 0x0F0      | -  | [^4]                                                                                         |
| CONSUMER_PLAYBACK_SPEED                             | 0x0F1      | -  | [^4]                                                                                         |
| CONSUMER_STANDARD_PLAY                              | 0x0F2      | -  | [^4]                                                                                         |
| CONSUMER_LONG_PLAY                                  | 0x0F3      | -  | [^4]                                                                                         |
| CONSUMER_EXTENDED_PLAY                              | 0x0F4      | -  | [^4]                                                                                         |
| CONSUMER_SLOW                                       | 0x0F5      | -  | [^3]                                                                                         |
| CONSUMER_FAN_ENABLE                                 | 0x100      | -  | [^4]                                                                                         |
| CONSUMER_FAN_SPEED                                  | 0x101      | -  | [^4]                                                                                         |
| CONSUMER_LIGHT_ENABLE                               | 0x102      | -  | [^4]                                                                                         |
| CONSUMER_LIGHT_ILLUMINATION_LEVEL                   | 0x103      | -  | [^4]                                                                                         |
| CONSUMER_CLIMATE_CONTROL_ENABLE                     | 0x104      | -  | [^4]                                                                                         |
| CONSUMER_ROOM_TEMPERATURE                           | 0x105      | -  | [^4]                                                                                         |
| CONSUMER_SECURITY_ENABLE                            | 0x106      | -  | [^4]                                                                                         |
| CONSUMER_FIRE_ALARM                                 | 0x107      | -  | [^4]                                                                                         |
| CONSUMER_POLICE_ALARM                               | 0x108      | -  | [^4]                                                                                         |
| CONSUMER_PROXIMITY                                  | 0x109      | -  | [^4]                                                                                         |
| CONSUMER_MOTION                                     | 0x10A      | -  | [^4]                                                                                         |
| CONSUMER_DURESS_ALARM                               | 0x10B      | -  | [^4]                                                                                         |
| CONSUMER_HOLDUP_ALARM                               | 0x10C      | -  | [^4]                                                                                         |
| CONSUMER_MEDICAL_ALARM                              | 0x10D      | -  | [^4]                                                                                         |
| CONSUMER_BALANCE_RIGHT                              | 0x150      | -  | [^4]                                                                                         |
| CONSUMER_BALANCE_LEFT                               | 0x151      | -  | [^4]                                                                                         |
| CONSUMER_BASS_INCREMENT                             | 0x152      | -  | [^4]                                                                                         |
| CONSUMER_BASS_DECREMENT                             | 0x153      | -  | [^4]                                                                                         |
| CONSUMER_TREBLE_INCREMENT                           | 0x154      | -  | [^4]                                                                                         |
| CONSUMER_TREBLE_DECREMENT                           | 0x155      | -  | [^4]                                                                                         |
| CONSUMER_SPEAKER_SYSTEM                             | 0x160      | -  | [^4]                                                                                         |
| CONSUMER_CHANNEL_LEFT                               | 0x161      | -  | [^4]                                                                                         |
| CONSUMER_CHANNEL_RIGHT                              | 0x162      | -  | [^4]                                                                                         |
| CONSUMER_CHANNEL_CENTER                             | 0x163      | -  | [^4]                                                                                         |
| CONSUMER_CHANNEL_FRONT                              | 0x164      | -  | [^4]                                                                                         |
| CONSUMER_CHANNEL_CENTER_FRONT                       | 0x165      | -  | [^4]                                                                                         |
| CONSUMER_CHANNEL_SIDE                               | 0x166      | -  | [^4]                                                                                         |
| CONSUMER_CHANNEL_SURROUND                           | 0x167      | -  | [^4]                                                                                         |
| CONSUMER_CHANNEL_LOW_FREQUENCY_ENHANCEMENT          | 0x168      | -  | [^4]                                                                                         |
| CONSUMER_CHANNEL_TOP                                | 0x169      | -  | [^4]                                                                                         |
| CONSUMER_CHANNEL_UNKNOWN                            | 0x16A      | -  | [^4]                                                                                         |
| CONSUMER_SUB_CHANNEL                                | 0x170      | -  | [^4]                                                                                         |
| CONSUMER_SUB_CHANNEL_INCREMENT                      | 0x171      | -  | [^4]                                                                                         |
| CONSUMER_SUB_CHANNEL_DECREMENT                      | 0x172      | -  | [^4]                                                                                         |
| CONSUMER_ALTERNATE_AUDIO_INCREMENT                  | 0x173      | -  | [^4]                                                                                         |
| CONSUMER_ALTERNATE_AUDIO_DECREMENT                  | 0x174      | -  | [^4]                                                                                         |
| CONSUMER_APPLICATION_LAUNCH_BUTTONS                 | 0x180      | -  | [^4]                                                                                         |
| CONSUMER_AL_LAUNCH_BUTTON_CONFIGURATION_TOOL        | 0x181      | -  | [^3]                                                                                         |
| CONSUMER_AL_PROGRAMMABLE_BUTTON_CONFIGURATION       | 0x182      | x  | [^2] BOOKMARK                                                                                |
| CONSUMER_AL_CONSUMER_CONTROL_CONFIGURATION          | 0x183      | x  | [^2] MUSIC                                                                                   |
| CONSUMER_AL_WORD_PROCESSOR                          | 0x184      | -  | [^3]                                                                                         |
| CONSUMER_AL_TEXT_EDITOR                             | 0x185      | -  | [^3]                                                                                         |
| CONSUMER_AL_SPREADSHEET                             | 0x186      | -  | [^3]                                                                                         |
| CONSUMER_AL_GRAPHICS_EDITOR                         | 0x187      | -  | [^3]                                                                                         |
| CONSUMER_AL_PRESENTATION_APP                        | 0x188      | -  | [^3]                                                                                         |
| CONSUMER_AL_DATABASE_APP                            | 0x189      | -  | [^3]                                                                                         |
| CONSUMER_AL_EMAIL_READER                            | 0x18A      | x  | [^2] ENVELOPE                                                                                |
| CONSUMER_AL_NEWSREADER                              | 0x18B      | -  | [^3]                                                                                         |
| CONSUMER_AL_VOICEMAIL                               | 0x18C      | -  | [^3]                                                                                         |
| CONSUMER_AL_CONTACTS_ADDRESS_BOOK                   | 0x18D      | x  | [^2] CONTACTS                                                                                |
| CONSUMER_AL_CALENDAR_SCHEDULE                       | 0x18E      | x  | [^2] CALENDAR                                                                                |
| CONSUMER_AL_TASK_PROJECT_MANAGER                    | 0x18F      | -  | [^3]                                                                                         |
| CONSUMER_AL_LOG_JOURNAL_TIMECARD                    | 0x190      | -  | [^3]                                                                                         |
| CONSUMER_AL_CHECKBOOK_FINANCE                       | 0x191      | -  | [^3]                                                                                         |
| CONSUMER_AL_CALCULATOR                              | 0x192      | x  | [^2] CALCULATOR                                                                              |
| CONSUMER_AL_A_V_CAPTURE_PLAYBACK                    | 0x193      | -  | [^3]                                                                                         |
| CONSUMER_AL_LOCAL_MACHINE_BROWSER                   | 0x194      | -  | [^3]                                                                                         |
| CONSUMER_AL_LAN_WAN_BROWSER                         | 0x195      | -  | [^4]                                                                                         |
| CONSUMER_AL_INTERNET_BROWSER                        | 0x196      | x  | [^2] EXPLORER (same as CONSUMER_MEDIA_SELECT_WWW)                                            |
| CONSUMER_AL_REMOTE_NETWORKING_ISP_CONNECT           | 0x197      | -  | [^4]                                                                                         |
| CONSUMER_AL_NETWORK_CONFERENCE                      | 0x198      | -  | [^4]                                                                                         |
| CONSUMER_AL_NETWORK_CHAT                            | 0x199      | -  | [^3]                                                                                         |
| CONSUMER_AL_TELEPHONY_DIALER                        | 0x19A      | -  | [^4]                                                                                         |
| CONSUMER_AL_LOGON                                   | 0x19B      | -  | [^4]                                                                                         |
| CONSUMER_AL_LOGOFF                                  | 0x19C      | x  | [^2] PROFILE_SWITCH                                                                          |
| CONSUMER_AL_LOGON_LOGOFF                            | 0x19D      | -  | [^4]                                                                                         |
| CONSUMER_AL_TERMINAL_LOCK_SCREENSAVER               | 0x19E      | x  | Sleep                                                                                        |
| CONSUMER_AL_CONTROL_PANEL                           | 0x19F      | -  | [^3]                                                                                         |
| CONSUMER_AL_COMMAND_LINE_PROCESSOR_RUN              | 0x1A0      | -  | [^4]                                                                                         |
| CONSUMER_AL_PROCESS_TASK_MANAGER                    | 0x1A1      | -  | [^4]                                                                                         |
| CONSUMER_AL_SELECT_TASK_APPLICATION                 | 0x1A2      | x  | Shows my applications                                                                        |
| CONSUMER_AL_NEXT_TASK_APPLICATION                   | 0x1A3      | -  | [^4]                                                                                         |
| CONSUMER_AL_PREVIOUS_TASK_APPLICATION               | 0x1A4      | -  | [^4]                                                                                         |
| CONSUMER_AL_PREEMPTIVE_HALT_TASK_APPLICATION        | 0x1A5      | -  | [^4]                                                                                         |
| CONSUMER_AL_INTEGRATED_HELP_CENTER                  | 0x1A6      | -  | [^3]                                                                                         |
| CONSUMER_AL_DOCUMENTS                               | 0x1A7      | -  | [^3]                                                                                         |
| CONSUMER_AL_THESAURUS                               | 0x1A8      | -  | [^4]                                                                                         |
| CONSUMER_AL_DICTIONARY                              | 0x1A9      | -  | [^4]                                                                                         |
| CONSUMER_AL_DESKTOP                                 | 0x1AA      | -  | [^4]                                                                                         |
| CONSUMER_AL_SPELL_CHECK                             | 0x1AB      | -  | [^3]                                                                                         |
| CONSUMER_AL_GRAMMAR_CHECK                           | 0x1AC      | -  | [^4]                                                                                         |
| CONSUMER_AL_WIRELESS_STATUS                         | 0x1AD      | -  | [^4]                                                                                         |
| CONSUMER_AL_KEYBOARD_LAYOUT                         | 0x1AE      | -  | [^3]                                                                                         |
| CONSUMER_AL_VIRUS_PROTECTION                        | 0x1AF      | -  | [^4]                                                                                         |
| CONSUMER_AL_ENCRYPTION                              | 0x1B0      | -  | [^4]                                                                                         |
| CONSUMER_AL_SCREEN_SAVER                            | 0x1B1      | -  | [^3]                                                                                         |
| CONSUMER_AL_ALARMS                                  | 0x1B2      | -  | [^4]                                                                                         |
| CONSUMER_AL_CLOCK                                   | 0x1B3      | -  | [^4]                                                                                         |
| CONSUMER_AL_FILE_BROWSER                            | 0x1B4      | -  | [^3]                                                                                         |
| CONSUMER_AL_POWER_STATUS                            | 0x1B5      | -  | [^4]                                                                                         |
| CONSUMER_AL_IMAGE_BROWSER                           | 0x1B6      | -  | [^3]                                                                                         |
| CONSUMER_AL_AUDIO_BROWSER                           | 0x1B7      | -  | [^3]                                                                                         |
| CONSUMER_AL_MOVIE_BROWSER                           | 0x1B8      | -  | [^3]                                                                                         |
| CONSUMER_AL_DIGITAL_RIGHTS_MANAGER                  | 0x1B9      | -  | [^4]                                                                                         |
| CONSUMER_AL_DIGITAL_WALLET                          | 0x1BA      | -  | [^4]                                                                                         |
| CONSUMER_AL_INSTANT_MESSAGING                       | 0x1BC      | -  | [^3]                                                                                         |
| CONSUMER_AL_OEM_FEATURES_TIPS_TUTORIAL_BROWSER      | 0x1BD      | -  | [^3]                                                                                         |
| CONSUMER_AL_OEM_HELP                                | 0x1BE      | -  | [^4]                                                                                         |
| CONSUMER_AL_ONLINE_COMMUNITY                        | 0x1BF      | -  | [^4]                                                                                         |
| CONSUMER_AL_ENTERTAINMENT_CONTENT_BROWSER           | 0x1C0      | -  | [^4]                                                                                         |
| CONSUMER_AL_ONLINE_SHOPPING_BROWSER                 | 0x1C1      | -  | [^4]                                                                                         |
| CONSUMER_AL_SMARTCARD_INFORMATION_HELP              | 0x1C2      | -  | [^4]                                                                                         |
| CONSUMER_AL_MARKET_MONITOR_FINANCE_BROWSER          | 0x1C3      | -  | [^4]                                                                                         |
| CONSUMER_AL_CUSTOMIZED_CORPORATE_NEWS_BROWSER       | 0x1C4      | -  | [^4]                                                                                         |
| CONSUMER_AL_ONLINE_ACTIVITY_BROWSER                 | 0x1C5      | -  | [^4]                                                                                         |
| CONSUMER_AL_RESEARCH_SEARCH_BROWSER                 | 0x1C6      | -  | [^4]                                                                                         |
| CONSUMER_AL_AUDIO_PLAYER                            | 0x1C7      | -  | [^4]                                                                                         |
| CONSUMER_AL_MESSAGE_STATUS                          | 0x1C8      | -  | [^4]                                                                                         |
| CONSUMER_AL_CONTACT_SYNC                            | 0x1C9      | -  | [^4]                                                                                         |
| CONSUMER_AL_NAVIGATION                              | 0x1CA      | -  | [^4]                                                                                         |
| CONSUMER_AL_CONTEXT_AWARE_DESKTOP_ASSISTANT         | 0x1CB      | -  | Voice assistant, same as CONSUMER_VOICE_COMMAND                                              |
| CONSUMER_GENERIC_GUI_APPLICATION_CONTROLS           | 0x200      | -  | [^4]                                                                                         |
| CONSUMER_AC_NEW                                     | 0x201      | -  | [^3]                                                                                         |
| CONSUMER_AC_OPEN                                    | 0x202      | -  | [^3]                                                                                         |
| CONSUMER_AC_CLOSE                                   | 0x203      | -  | [^3]                                                                                         |
| CONSUMER_AC_EXIT                                    | 0x204      | -  | [^3]                                                                                         |
| CONSUMER_AC_MAXIMIZE                                | 0x205      | -  | [^4]                                                                                         |
| CONSUMER_AC_MINIMIZE                                | 0x206      | -  | [^4]                                                                                         |
| CONSUMER_AC_SAVE                                    | 0x207      | -  | [^3]                                                                                         |
| CONSUMER_AC_PRINT                                   | 0x208      | -  | [^3]                                                                                         |
| CONSUMER_AC_PROPERTIES                              | 0x209      | -  | [^3]                                                                                         |
| CONSUMER_AC_UNDO                                    | 0x21A      | -  | [^3]                                                                                         |
| CONSUMER_AC_COPY                                    | 0x21B      | x  | [^2] COPY                                                                                    |
| CONSUMER_AC_CUT                                     | 0x21C      | x  | [^2] CUT                                                                                     |
| CONSUMER_AC_PASTE                                   | 0x21D      | x  | [^2] PASTE                                                                                   |
| CONSUMER_AC_SELECT_ALL                              | 0x21E      | -  | [^4]                                                                                         |
| CONSUMER_AC_FIND                                    | 0x21F      | -  | [^3]                                                                                         |
| CONSUMER_AC_FIND_AND_REPLACE                        | 0x220      | -  | [^4]                                                                                         |
| CONSUMER_AC_SEARCH                                  | 0x221      | -  | Search (voice assist)                                                                        |
| CONSUMER_AC_GO_TO                                   | 0x222      | -  | [^3]                                                                                         |
| CONSUMER_AC_HOME                                    | 0x223      | x  | Home button                                                                                  |
| CONSUMER_AC_BACK                                    | 0x224      | x  | Back button                                                                                  |
| CONSUMER_AC_FORWARD                                 | 0x225      | x  | [^2] FORWARD                                                                                 |
| CONSUMER_AC_STOP                                    | 0x226      | x  | Plex: stop playback. Does not work in Spotify                                                |
| CONSUMER_AC_REFRESH                                 | 0x227      | -  |                                                                                              |
| CONSUMER_AC_PREVIOUS_LINK                           | 0x228      | -  | [^4]                                                                                         |
| CONSUMER_AC_NEXT_LINK                               | 0x229      | -  | [^4]                                                                                         |
| CONSUMER_AC_BOOKMARKS                               | 0x22A      | x  | [^2] BOOKMARK                                                                                |
| CONSUMER_AC_HISTORY                                 | 0x22B      | -  | [^4]                                                                                         |
| CONSUMER_AC_SUBSCRIPTIONS                           | 0x22C      | -  | [^4]                                                                                         |
| CONSUMER_AC_ZOOM_IN                                 | 0x22D      | -  | [^3]                                                                                         |
| CONSUMER_AC_ZOOM_OUT                                | 0x22E      | -  | [^3]                                                                                         |
| CONSUMER_AC_ZOOM                                    | 0x22F      | -  | [^3]                                                                                         |
| CONSUMER_AC_FULL_SCREEN_VIEW                        | 0x230      | -  | [^4]                                                                                         |
| CONSUMER_AC_NORMAL_VIEW                             | 0x231      | -  | [^4]                                                                                         |
| CONSUMER_AC_VIEW_TOGGLE                             | 0x232      | -  | [^4]                                                                                         |
| CONSUMER_AC_SCROLL_UP                               | 0x233      | x  | PAGE_UP, scroll list                                                                         |
| CONSUMER_AC_SCROLL_DOWN                             | 0x234      | x  | PAGE_DOWN, scroll list                                                                       |
| CONSUMER_AC_SCROLL                                  | 0x235      | -  | [^4]                                                                                         |
| CONSUMER_AC_PAN_LEFT                                | 0x236      | -  | [^4]                                                                                         |
| CONSUMER_AC_PAN_RIGHT                               | 0x237      | -  | [^4]                                                                                         |
| CONSUMER_AC_PAN                                     | 0x238      | -  |                                                                                              |
| CONSUMER_AC_NEW_WINDOW                              | 0x239      | -  | [^4]                                                                                         |
| CONSUMER_AC_TILE_HORIZONTALLY                       | 0x23A      | -  | [^4]                                                                                         |
| CONSUMER_AC_TILE_VERTICALLY                         | 0x23B      | -  | [^4]                                                                                         |
| CONSUMER_AC_FORMAT                                  | 0x23C      | -  | [^4]                                                                                         |
| CONSUMER_AC_EDIT                                    | 0x23D      | -  | [^3]                                                                                         |
| CONSUMER_AC_BOLD                                    | 0x23E      | -  | [^4]                                                                                         |
| CONSUMER_AC_ITALICS                                 | 0x23F      | -  | [^4]                                                                                         |
| CONSUMER_AC_UNDERLINE                               | 0x240      | -  | [^4]                                                                                         |
| CONSUMER_AC_STRIKETHROUGH                           | 0x241      | -  | [^4]                                                                                         |
| CONSUMER_AC_SUBSCRIPT                               | 0x242      | -  | [^4]                                                                                         |
| CONSUMER_AC_SUPERSCRIPT                             | 0x243      | -  | [^4]                                                                                         |
| CONSUMER_AC_ALL_CAPS                                | 0x244      | -  | [^4]                                                                                         |
| CONSUMER_AC_ROTATE                                  | 0x245      | -  | [^4]                                                                                         |
| CONSUMER_AC_RESIZE                                  | 0x246      | -  | [^4]                                                                                         |
| CONSUMER_AC_FLIP_HORIZONTAL                         | 0x247      | -  | [^4]                                                                                         |
| CONSUMER_AC_FLIP_VERTICAL                           | 0x248      | -  | [^4]                                                                                         |
| CONSUMER_AC_MIRROR_HORIZONTAL                       | 0x249      | -  | [^4]                                                                                         |
| CONSUMER_AC_MIRROR_VERTICAL                         | 0x24A      | -  | [^4]                                                                                         |
| CONSUMER_AC_FONT_SELECT                             | 0x24B      | -  | [^4]                                                                                         |
| CONSUMER_AC_FONT_COLOR                              | 0x24C      | -  | [^4]                                                                                         |
| CONSUMER_AC_FONT_SIZE                               | 0x24D      | -  | [^4]                                                                                         |
| CONSUMER_AC_JUSTIFY_LEFT                            | 0x24E      | -  | [^4]                                                                                         |
| CONSUMER_AC_JUSTIFY_CENTER_H                        | 0x24F      | -  | [^4]                                                                                         |
| CONSUMER_AC_JUSTIFY_RIGHT                           | 0x250      | -  | [^4]                                                                                         |
| CONSUMER_AC_JUSTIFY_BLOCK_H                         | 0x251      | -  | [^4]                                                                                         |
| CONSUMER_AC_JUSTIFY_TOP                             | 0x252      | -  | [^4]                                                                                         |
| CONSUMER_AC_JUSTIFY_CENTER_V                        | 0x253      | -  | [^4]                                                                                         |
| CONSUMER_AC_JUSTIFY_BOTTOM                          | 0x254      | -  | [^4]                                                                                         |
| CONSUMER_AC_JUSTIFY_BLOCK_V                         | 0x255      | -  | [^4]                                                                                         |
| CONSUMER_AC_INDENT_DECREASE                         | 0x256      | -  | [^4]                                                                                         |
| CONSUMER_AC_INDENT_INCREASE                         | 0x257      | -  | [^4]                                                                                         |
| CONSUMER_AC_NUMBERED_LIST                           | 0x258      | -  | [^4]                                                                                         |
| CONSUMER_AC_RESTART_NUMBERING                       | 0x259      | -  | [^4]                                                                                         |
| CONSUMER_AC_BULLETED_LIST                           | 0x25A      | -  | [^4]                                                                                         |
| CONSUMER_AC_PROMOTE                                 | 0x25B      | -  | [^4]                                                                                         |
| CONSUMER_AC_DEMOTE                                  | 0x25C      | -  | [^4]                                                                                         |
| CONSUMER_AC_YES                                     | 0x25D      | -  | [^4]                                                                                         |
| CONSUMER_AC_NO                                      | 0x25E      | -  | [^4]                                                                                         |
| CONSUMER_AC_CANCEL                                  | 0x25F      | -  | [^3]                                                                                         |
| CONSUMER_AC_CATALOG                                 | 0x260      | -  | [^4]                                                                                         |
| CONSUMER_AC_BUY_CHECKOUT                            | 0x261      | -  | [^4]                                                                                         |
| CONSUMER_AC_ADD_TO_CART                             | 0x262      | -  | [^4]                                                                                         |
| CONSUMER_AC_EXPAND                                  | 0x263      | -  | [^4]                                                                                         |
| CONSUMER_AC_EXPAND_ALL                              | 0x264      | -  | [^4]                                                                                         |
| CONSUMER_AC_COLLAPSE                                | 0x265      | -  | [^4]                                                                                         |
| CONSUMER_AC_COLLAPSE_ALL                            | 0x266      | -  | [^4]                                                                                         |
| CONSUMER_AC_PRINT_PREVIEW                           | 0x267      | -  | [^4]                                                                                         |
| CONSUMER_AC_PASTE_SPECIAL                           | 0x268      | -  | [^4]                                                                                         |
| CONSUMER_AC_INSERT_MODE                             | 0x269      | x  | INSERT                                                                                       |
| CONSUMER_AC_DELETE                                  | 0x26A      | x  | FORWARD_DEL                                                                                  |
| CONSUMER_AC_LOCK                                    | 0x26B      | -  | [^4]                                                                                         |
| CONSUMER_AC_UNLOCK                                  | 0x26C      | -  | [^4]                                                                                         |
| CONSUMER_AC_PROTECT                                 | 0x26D      | -  | [^4]                                                                                         |
| CONSUMER_AC_UNPROTECT                               | 0x26E      | -  | [^4]                                                                                         |
| CONSUMER_AC_ATTACH_COMMENT                          | 0x26F      | -  | [^4]                                                                                         |
| CONSUMER_AC_DELETE_COMMENT                          | 0x270      | -  | [^4]                                                                                         |
| CONSUMER_AC_VIEW_COMMENT                            | 0x271      | -  | [^4]                                                                                         |
| CONSUMER_AC_SELECT_WORD                             | 0x272      | -  | [^4]                                                                                         |
| CONSUMER_AC_SELECT_SENTENCE                         | 0x273      | -  | [^4]                                                                                         |
| CONSUMER_AC_SELECT_PARAGRAPH                        | 0x274      | -  | [^4]                                                                                         |
| CONSUMER_AC_SELECT_COLUMN                           | 0x275      | -  | [^4]                                                                                         |
| CONSUMER_AC_SELECT_ROW                              | 0x276      | -  | [^4]                                                                                         |
| CONSUMER_AC_SELECT_TABLE                            | 0x277      | -  | [^4]                                                                                         |
| CONSUMER_AC_SELECT_OBJECT                           | 0x278      | -  | [^4]                                                                                         |
| CONSUMER_AC_REDO_REPEAT                             | 0x279      | -  | [^3]                                                                                         |
| CONSUMER_AC_SORT                                    | 0x27A      | -  | [^4]                                                                                         |
| CONSUMER_AC_SORT_ASCENDING                          | 0x27B      | -  | [^4]                                                                                         |
| CONSUMER_AC_SORT_DESCENDING                         | 0x27C      | -  | [^4]                                                                                         |
| CONSUMER_AC_FILTER                                  | 0x27D      | -  | [^4]                                                                                         |
| CONSUMER_AC_SET_CLOCK                               | 0x27E      | -  | [^4]                                                                                         |
| CONSUMER_AC_VIEW_CLOCK                              | 0x27F      | -  | [^4]                                                                                         |
| CONSUMER_AC_SELECT_TIME_ZONE                        | 0x280      | -  | [^4]                                                                                         |
| CONSUMER_AC_EDIT_TIME_ZONES                         | 0x281      | -  | [^4]                                                                                         |
| CONSUMER_AC_SET_ALARM                               | 0x282      | -  | [^4]                                                                                         |
| CONSUMER_AC_CLEAR_ALARM                             | 0x283      | -  | [^4]                                                                                         |
| CONSUMER_AC_SNOOZE_ALARM                            | 0x284      | -  | [^4]                                                                                         |
| CONSUMER_AC_RESET_ALARM                             | 0x285      | -  | [^4]                                                                                         |
| CONSUMER_AC_SYNCHRONIZE                             | 0x286      | -  | [^4]                                                                                         |
| CONSUMER_AC_SEND_RECEIVE                            | 0x287      | -  | [^4]                                                                                         |
| CONSUMER_AC_SEND_TO                                 | 0x288      | -  | [^4]                                                                                         |
| CONSUMER_AC_REPLY                                   | 0x289      | -  | [^3]                                                                                         |
| CONSUMER_AC_REPLY_ALL                               | 0x28A      | -  | [^4]                                                                                         |
| CONSUMER_AC_FORWARD_MSG                             | 0x28B      | -  | [^3]                                                                                         |
| CONSUMER_AC_SEND                                    | 0x28C      | -  | [^3]                                                                                         |
| CONSUMER_AC_ATTACH_FILE                             | 0x28D      | -  | [^4]                                                                                         |
| CONSUMER_AC_UPLOAD                                  | 0x28E      | -  | [^4]                                                                                         |
| CONSUMER_AC_DOWNLOAD_SAVE_TARGET_AS                 | 0x28F      | -  | [^4]                                                                                         |
| CONSUMER_AC_SET_BORDERS                             | 0x290      | -  | [^4]                                                                                         |
| CONSUMER_AC_INSERT_ROW                              | 0x291      | -  | [^4]                                                                                         |
| CONSUMER_AC_INSERT_COLUMN                           | 0x292      | -  | [^4]                                                                                         |
| CONSUMER_AC_INSERT_FILE                             | 0x293      | -  | [^4]                                                                                         |
| CONSUMER_AC_INSERT_PICTURE                          | 0x294      | -  | [^4]                                                                                         |
| CONSUMER_AC_INSERT_OBJECT                           | 0x295      | -  | [^4]                                                                                         |
| CONSUMER_AC_INSERT_SYMBOL                           | 0x296      | -  | [^4]                                                                                         |
| CONSUMER_AC_SAVE_AND_CLOSE                          | 0x297      | -  | [^4]                                                                                         |
| CONSUMER_AC_RENAME                                  | 0x298      | -  | [^4]                                                                                         |
| CONSUMER_AC_MERGE                                   | 0x299      | -  | [^4]                                                                                         |
| CONSUMER_AC_SPLIT                                   | 0x29A      | -  | [^4]                                                                                         |
| CONSUMER_AC_DISRIBUTE_HORIZONTALLY                  | 0x29B      | -  | [^4]                                                                                         |
| CONSUMER_AC_DISTRIBUTE_VERTICALLY                   | 0x29C      | -  | [^4]                                                                                         |
| CONSUMER_AC_NEXT_KEYBOARD_LAYOUT_SELECT             | 0x29D      | -  | [^4]                                                                                         |
| CONSUMER_AC_NAVIGATION_GUIDANCE                     | 0x29E      | -  | [^4]                                                                                         |
| CONSUMER_AC_DESKTOP_SHOW_ALL_WINDOWS                | 0x29F      | -  | [^4]                                                                                         |
| CONSUMER_AC_SOFT_KEY_LEFT                           | 0x2A0      | -  | [^4]                                                                                         |
| CONSUMER_AC_SOFT_KEY_RIGHT                          | 0x2A1      | -  | [^4]                                                                                         |
| CONSUMER_AC_DESKTOP_SHOW_ALL_APPLICATIONS           | 0x2A2      | x  | Shows control panel                                                                          |
| CONSUMER_AC_IDLE_KEEP_ALIVE                         | 0x2B0      | -  | [^4]                                                                                         |
| CONSUMER_EXTENDED_KEYBOARD_ATTRIBUTES_COLLECTION    | 0x2C0      | -  | [^4]                                                                                         |
| CONSUMER_KEYBOARD_FORM_FACTOR                       | 0x2C1      | -  | [^4]                                                                                         |
| CONSUMER_KEYBOARD_KEY_TYPE                          | 0x2C2      | -  | [^4]                                                                                         |
| CONSUMER_KEYBOARD_PHYSICAL_LAYOUT                   | 0x2C3      | -  | [^4]                                                                                         |
| CONSUMER_VENDOR_SPECIFIC_KEYBOARD_PHYSICAL_LAYOUT   | 0x2C4      | -  | [^4]                                                                                         |
| CONSUMER_KEYBOARD_IETF_LANGUAGE_TAG_INDEX           | 0x2C5      | -  | [^4]                                                                                         |
| CONSUMER_IMPLEMENTED_KEYBOARD_INPUT_ASSIST_CONTROLS | 0x2C6      | -  | [^4]                                                                                         |
| CONSUMER_KEYBOARD_INPUT_ASSIST_PREVIOUS             | 0x2C7      | -  | [^3]                                                                                         |
| CONSUMER_KEYBOARD_INPUT_ASSIST_NEXT                 | 0x2C8      | -  | [^3]                                                                                         |
| CONSUMER_KEYBOARD_INPUT_ASSIST_PREVIOUS_GROUP       | 0x2C9      | -  | [^3]                                                                                         |
| CONSUMER_KEYBOARD_INPUT_ASSIST_NEXT_GROUP           | 0x2CA      | -  | [^3]                                                                                         |
| CONSUMER_KEYBOARD_INPUT_ASSIST_ACCEPT               | 0x2CB      | -  | [^3]                                                                                         |
| CONSUMER_KEYBOARD_INPUT_ASSIST_CANCEL               | 0x2CC      | -  | [^3]                                                                                         |

## System Controls (Generic Desktop Page (0x01))

| Key name            | Usage code | Ok | Comment                          |
|---------------------|------------|----|----------------------------------|
| SYSTEM_POWER_DOWN   | 0x81       | x  | Power toggle                     |
| SYSTEM_SLEEP        | 0x82       | x  | Sleep                            |
| SYSTEM_WAKE_UP      | 0x83       | x  | Wake up                          |
| SYSTEM_CONTEXT_MENU | 0x84       | -  |                                  |
| SYSTEM_MAIN_MENU    | 0x85       | x  | Context menu (long press select) |
| SYSTEM_APP_MENU     | 0x86       | -  |                                  |
| SYSTEM_MENU_HELP    | 0x87       | -  |                                  |
| SYSTEM_MENU_EXIT    | 0x88       | -  |                                  |
| SYSTEM_MENU_SELECT  | 0x89       | x  | Same as KEY_RETURN               |
| SYSTEM_MENU_RIGHT   | 0x8A       | x  | Same as arrow key navigation     |
| SYSTEM_MENU_LEFT    | 0x8B       | x  |                                  |
| SYSTEM_MENU_UP      | 0x8C       | x  |                                  |
| SYSTEM_MENU_DOWN    | 0x8D       | x  |                                  |
| SYSTEM_COLD_RESTART | 0x8E       | -  |                                  |
| SYSTEM_WARM_RESTART | 0x8F       | -  |                                  |
| SYSTEM_DPAD_UP      | 0x90       | -  |                                  |
| SYSTEM_DPAD_DOWN    | 0x91       | -  |                                  |
| SYSTEM_DPAD_RIGHT   | 0x92       | -  |                                  |
| SYSTEM_DPAD_LEFT    | 0x93       | -  |                                  |


[^1]: Works for text entry
[^2]: Recognized in Button Mapper
[^3]: Not recognized in Button Mapper
[^4]: No Android key code
