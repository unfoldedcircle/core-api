# Android

Notes:
- Use [Button Mapper: Remap your keys](https://play.google.com/store/apps/details?id=flar2.homebutton) to assign unused keys to commands or to launch an app. For example set the function keys to launch specific apps. 
- It might make sense to filter codes according to supported Android key code names listed in:
  - <https://source.android.com/docs/core/interaction/input/keyboard-devices#hid-keyboard-and-keypad-page-0x07>
  - <https://android.googlesource.com/kernel/msm.git/+/refs/tags/android-14.0.0_r0.78/drivers/hid/hid-input.c#875>
- Key layout files show consumer codes: <https://cs.android.com/android/platform/superproject/+/master:frameworks/base/data/keyboards/Vendor_0957_Product_0001.kl>

## Regular keycodes (Keyboard Keypad Page (0x07))

Source: https://android.googlesource.com/kernel/msm.git/+/refs/tags/android-14.0.0_r0.78/drivers/hid/hid-input.c#39

| Key name                | Usage code | Android key code     | Comment                                                  |
|-------------------------|------------|----------------------|----------------------------------------------------------|
| KEY_A                   | 4          | 30                   |                                                          |
| KEY_B                   | 5          | 48                   |                                                          |
| KEY_C                   | 6          | 46                   |                                                          |
| KEY_D                   | 7          | 32                   |                                                          |
| KEY_E                   | 8          | 18                   |                                                          |
| KEY_F                   | 9          | 33                   |                                                          |
| KEY_G                   | 10         | 34                   |                                                          |
| KEY_H                   | 11         | 35                   |                                                          |
| KEY_I                   | 12         | 23                   |                                                          |
| KEY_J                   | 13         | 36                   |                                                          |
| KEY_K                   | 14         | 37                   |                                                          |
| KEY_L                   | 15         | 38                   |                                                          |
| KEY_M                   | 16         | 50                   |                                                          |
| KEY_N                   | 17         | 49                   |                                                          |
| KEY_O                   | 18         | 24                   |                                                          |
| KEY_P                   | 19         | 25                   |                                                          |
| KEY_Q                   | 20         | 16                   |                                                          |
| KEY_R                   | 21         | 19                   |                                                          |
| KEY_S                   | 22         | 31                   |                                                          |
| KEY_T                   | 23         | 20                   |                                                          |
| KEY_U                   | 24         | 22                   |                                                          |
| KEY_V                   | 25         | 47                   |                                                          |
| KEY_W                   | 26         | 17                   |                                                          |
| KEY_X                   | 27         | 45                   |                                                          |
| KEY_Y                   | 28         | 21                   |                                                          |
| KEY_Z                   | 29         | 44                   |                                                          |
| KEY_1                   | 30         | 2                    |                                                          |
| KEY_2                   | 31         | 3                    |                                                          |
| KEY_3                   | 32         | 4                    |                                                          |
| KEY_4                   | 33         | 5                    |                                                          |
| KEY_5                   | 34         | 6                    |                                                          |
| KEY_6                   | 35         | 7                    |                                                          |
| KEY_7                   | 36         | 8                    |                                                          |
| KEY_8                   | 37         | 9                    |                                                          |
| KEY_9                   | 38         | 10                   |                                                          |
| KEY_0                   | 39         | 11                   |                                                          |
| KEY_RETURN              | 40         | 28                   |                                                          |
| KEY_ESC                 | 41         | 1                    |                                                          |
| KEY_BACKSPACE           | 42         | 14                   |                                                          |
| KEY_TAB                 | 43         | 15                   |                                                          |
| KEY_SPACE               | 44         | 57                   |                                                          |
| KEY_MINUS               | 45         | 12                   |                                                          |
| KEY_EQUAL               | 46         | 13                   |                                                          |
| KEY_LEFT_BRACE          | 47         | 26                   |                                                          |
| KEY_RIGHT_BRACE         | 48         | 27                   |                                                          |
| KEY_BACKSLASH           | 49         | 43                   |                                                          |
| KEY_HASH_TILDE          | 50         | 43                   |                                                          |
| KEY_SEMICOLON           | 51         | 39                   |                                                          |
| KEY_APOSTROPHE          | 52         | 40                   |                                                          |
| KEY_GRAVE               | 53         | 41                   |                                                          |
| KEY_COMMA               | 54         | 51                   |                                                          |
| KEY_DOT                 | 55         | 52                   |                                                          |
| KEY_SLASH               | 56         | 53                   |                                                          |
| KEY_CAPSLOCK            | 57         | 58                   |                                                          |
| KEY_F1                  | 58         | 59                   |                                                          |
| KEY_F2                  | 59         | 60                   |                                                          |
| KEY_F3                  | 60         | 61                   |                                                          |
| KEY_F4                  | 61         | 62                   |                                                          |
| KEY_F5                  | 62         | 63                   |                                                          |
| KEY_F6                  | 63         | 64                   |                                                          |
| KEY_F7                  | 64         | 65                   |                                                          |
| KEY_F8                  | 65         | 66                   |                                                          |
| KEY_F9                  | 66         | 67                   |                                                          |
| KEY_F10                 | 67         | 68                   |                                                          |
| KEY_F11                 | 68         | 87                   |                                                          |
| KEY_F12                 | 69         | 88                   |                                                          |
| KEY_SYSRQ               | 70         | 99                   |                                                          |
| KEY_SCROLL_LOCK         | 71         | 70                   |                                                          |
| KEY_PAUSE               | 72         | 119                  |                                                          |
| KEY_INSERT              | 73         | 110                  |                                                          |
| KEY_HOME                | 74         | 102                  |                                                          |
| KEY_PAGE_UP             | 75         | 104                  |                                                          |
| KEY_DELETE              | 76         | 111                  |                                                          |
| KEY_END                 | 77         | 107                  |                                                          |
| KEY_PAGE_DOWN           | 78         | 109                  |                                                          |
| KEY_RIGHT_ARROW         | 79         | 106                  |                                                          |
| KEY_LEFT_ARROW          | 80         | 105                  |                                                          |
| KEY_DOWN_ARROW          | 81         | 108                  |                                                          |
| KEY_UP_ARROW            | 82         | 103                  |                                                          |
| KEYPAD_NUMLOCK          | 83         | 69                   |                                                          |
| KEYPAD_SLASH            | 84         | 98                   |                                                          |
| KEYPAD_ASTERISK         | 85         | 55                   |                                                          |
| KEYPAD_MINUS            | 86         | 74                   |                                                          |
| KEYPAD_PLUS             | 87         | 78                   |                                                          |
| KEYPAD_ENTER            | 88         | 96                   |                                                          |
| KEYPAD_1                | 89         | 79                   |                                                          |
| KEYPAD_2                | 90         | 80                   |                                                          |
| KEYPAD_3                | 91         | 81                   |                                                          |
| KEYPAD_4                | 92         | 75                   |                                                          |
| KEYPAD_5                | 93         | 76                   |                                                          |
| KEYPAD_6                | 94         | 77                   |                                                          |
| KEYPAD_7                | 95         | 71                   |                                                          |
| KEYPAD_8                | 96         | 72                   |                                                          |
| KEYPAD_9                | 97         | 73                   |                                                          |
| KEYPAD_0                | 98         | 82                   |                                                          |
| KEYPAD_DOT              | 99         | 83                   |                                                          |
| KEY_102ND               | 100        | 86                   |                                                          |
| KEY_APPLICATION         | 101        | 127                  |                                                          |
| KEY_POWER               | 102        | 116                  |                                                          |
| KEYPAD_EQUAL            | 103        | 117                  |                                                          |
| KEY_F13                 | 104        | 183                  |                                                          |
| KEY_F14                 | 105        | 184                  |                                                          |
| KEY_F15                 | 106        | 185                  |                                                          |
| KEY_F16                 | 107        | 186                  |                                                          |
| KEY_F17                 | 108        | 187                  |                                                          |
| KEY_F18                 | 109        | 188                  |                                                          |
| KEY_F19                 | 110        | 189                  |                                                          |
| KEY_F20                 | 111        | 190                  |                                                          |
| KEY_F21                 | 112        | 191                  |                                                          |
| KEY_F22                 | 113        | 192                  |                                                          |
| KEY_F23                 | 114        | 193                  |                                                          |
| KEY_F24                 | 115        | 194                  |                                                          |
| KEY_EXECUTE             | 116        | 134                  |                                                          |
| KEY_HELP                | 117        | 138                  |                                                          |
| KEY_MENU                | 118        | 130                  |                                                          |
| KEY_SELECT              | 119        | 132                  |                                                          |
| KEY_STOP                | 120        | 128                  |                                                          |
| KEY_AGAIN               | 121        | 129                  |                                                          |
| KEY_UNDO                | 122        | 131                  |                                                          |
| KEY_CUT                 | 123        | 137                  |                                                          |
| KEY_COPY                | 124        | 133                  |                                                          |
| KEY_PASTE               | 125        | 135                  |                                                          |
| KEY_FIND                | 126        | 136                  |                                                          |
| KEY_MUTE                | 127        | 113                  |                                                          |
| KEY_VOLUME_UP           | 128        | 115                  |                                                          |
| KEY_VOLUME_DOWN         | 129        | 114                  |                                                          |
| -                       | 130        | -                    |                                                          |
| -                       | 131        | -                    |                                                          |
| -                       | 132        | -                    |                                                          |
| KEYPAD_COMMA            | 133        | 121                  |                                                          |
| -                       | 134        | -                    |                                                          |
| KEY_RO                  | 135        | 89                   |                                                          |
| KEY_KATAKANA_HIRAGANA   | 136        | 93                   |                                                          |
| KEY_YEN                 | 137        | 124                  |                                                          |
| KEY_HENKAN              | 138        | 92                   |                                                          |
| KEY_MUHENKAN            | 139        | 94                   |                                                          |
| KEYPAD_JPCOMMA          | 140        | 95                   |                                                          |
| KEY_INTERNATIONAL7      | 141        | -                    |                                                          |
| KEY_INTERNATIONAL8      | 142        | -                    |                                                          |
| KEY_INTERNATIONAL9      | 143        | -                    |                                                          |
| KEY_HANGEUL             | 144        | 122                  |                                                          |
| KEY_HANJA               | 145        | 123                  |                                                          |
| KEY_KATAKANA            | 146        | 90                   |                                                          |
| KEY_HIRAGANA            | 147        | 91                   |                                                          |
| KEY_ZENKAKU_HANKAKU     | 148        | 85                   |                                                          |
| KEY_FURIGANA            | 149        | -                    |                                                          |
| KEY_LANG7               | 150        | -                    |                                                          |
| KEY_LANG8               | 151        | -                    |                                                          |
| KEY_LANG9               | 152        | -                    |                                                          |
| -                       | 153        | -                    |                                                          |
| -                       | 154        | -                    |                                                          |
| -                       | 155        | -                    |                                                          |
| -                       | 156        | 111 KEY_DELETE       |                                                          |
| -                       | 157        | -                    |                                                          |
| -                       | 158        | -                    |                                                          |
| -                       | 159        | -                    |                                                          |
| -                       | 160        | -                    |                                                          |
| -                       | 161        | -                    |                                                          |
| -                       | 162        | -                    |                                                          |
| -                       | 163        | -                    |                                                          |
| -                       | 164        | -                    |                                                          |
| -                       | 165        | -                    |                                                          |
| -                       | 166        | -                    |                                                          |
| -                       | 167        | -                    |                                                          |
| -                       | 168        | -                    |                                                          |
| -                       | 169        | -                    |                                                          |
| -                       | 170        | -                    |                                                          |
| -                       | 171        | -                    |                                                          |
| -                       | 172        | -                    |                                                          |
| -                       | 173        | -                    |                                                          |
| -                       | 174        | -                    |                                                          |
| -                       | 175        | -                    |                                                          |
| -                       | 176        | -                    |                                                          |                                                          |
| -                       | 177        | -                    |                                                          |
| -                       | 178        | -                    |                                                          |
| -                       | 179        | -                    |                                                          |
| -                       | 180        | -                    |                                                          |
| -                       | 181        | -                    |                                                          |
| -                       | 182        | 179 KEY_KPLEFTPAREN  |                                                          |
| -                       | 183        | 180 KEY_KPRIGHTPAREN |                                                          |
| -                       | 184        | -                    |                                                          |
| -                       | 185        | -                    |                                                          |
| -                       | 186        | -                    |                                                          |
| -                       | 187        | -                    |                                                          |
| -                       | 188        | -                    |                                                          |
| -                       | 189        | -                    |                                                          |
| -                       | 190        | -                    |                                                          |
| -                       | 191        | -                    |                                                          |
| -                       | 192        | -                    |                                                          |
| -                       | 193        | -                    |                                                          |
| -                       | 194        | -                    |                                                          |
| -                       | 195        | -                    |                                                          |
| -                       | 196        | -                    |                                                          |
| -                       | 197        | -                    |                                                          |
| -                       | 198        | -                    |                                                          |
| -                       | 199        | -                    |                                                          |
| -                       | 200        | -                    |                                                          |
| -                       | 201        | -                    |                                                          |
| -                       | 202        | -                    |                                                          |
| -                       | 203        | -                    |                                                          |
| -                       | 204        | -                    |                                                          |
| -                       | 205        | -                    |                                                          |
| -                       | 206        | -                    |                                                          |
| -                       | 207        | -                    |                                                          |
| -                       | 208        | -                    |                                                          |
| -                       | 209        | -                    |                                                          |
| -                       | 210        | -                    |                                                          |
| -                       | 211        | -                    |                                                          |
| -                       | 212        | -                    |                                                          |
| -                       | 213        | -                    |                                                          |
| -                       | 214        | -                    |                                                          |
| -                       | 215        | -                    |                                                          |
| -                       | 216        | 111 KEY_DELETE       |                                                          |
| -                       | 217        | -                    |                                                          |
| -                       | 218        | -                    |                                                          |
| -                       | 229        | -                    |                                                          |
| -                       | 220        | -                    |                                                          |
| -                       | 221        | -                    |                                                          |
| -                       | 222        | -                    |                                                          |
| -                       | 223        | -                    |                                                          |
| KEY_LEFT_CONTROL        | 224        | 29  KEY_LEFTCTRL     |                                                          |
| KEY_LEFT_SHIFT          | 225        | 42  KEY_LEFTSHIFT    |                                                          |
| KEY_LEFT_ALT            | 226        | 56  KEY_LEFTALT      |                                                          |
| KEY_LEFT_GUI            | 227        | 125 KEY_LEFTMETA     |                                                          |
| KEY_RIGHT_CONTROL       | 228        | 97  KEY_RIGHTCTRL    |                                                          |
| KEY_RIGHT_SHIFT         | 229        | 54  KEY_RIGHTSHIFT   |                                                          |
| KEY_RIGHT_ALT           | 230        | 100 KEY_RIGHTALT     |                                                          |
| KEY_RIGHT_GUI           | 231        | 126 KEY_RIGHTMETA    |                                                          |
| KEY_MEDIA_PLAY_PAUSE    | 232        | 164                  | Not specified in official HID Usage Table specification. |
| KEY_MEDIA_STOP_CD       | 233        | 166                  | Applies to all "KEY_MEDIA_" keys.                        |
| KEY_MEDIA_PREVIOUS_SONG | 234        | 165                  | --> found in Android sources                             |
| KEY_MEDIA_NEXT_SONG     | 235        | 163                  |                                                          |
| KEY_MEDIA_EJECT_CD      | 236        | 161                  |                                                          |
| KEY_MEDIA_VOLUME_UP     | 237        | 115                  |                                                          |
| KEY_MEDIA_VOLUME_DOWN   | 238        | 114                  |                                                          |
| KEY_MEDIA_MUTE          | 239        | 113                  |                                                          |
| KEY_MEDIA_WWW           | 240        | 150                  |                                                          |
| KEY_MEDIA_BACK          | 241        | 158                  |                                                          |
| KEY_MEDIA_FORWARD       | 242        | 159                  |                                                          |
| KEY_MEDIA_STOP          | 243        | 128                  |                                                          |
| KEY_MEDIA_FIND          | 244        | 136                  |                                                          |
| KEY_MEDIA_SCROLL_UP     | 245        | 177                  |                                                          |
| KEY_MEDIA_SCROLL_DOWN   | 246        | 178                  |                                                          |
| KEY_MEDIA_EDIT          | 247        | 176                  |                                                          |
| KEY_MEDIA_SLEEP         | 248        | 142                  |                                                          |
| KEY_MEDIA_COFFEE        | 249        | 152                  |                                                          |
| KEY_MEDIA_REFRESH       | 250        | 173                  |                                                          |
| KEY_MEDIA_CALC          | 251        | 140                  |                                                          |
| -                       | 252        | -                    |                                                          |
| -                       | 253        | -                    |                                                          |
| -                       | 254        | -                    |                                                          |
| -                       | 255        | -                    |                                                          |

## Consumer codes (Consumer Page (0x0C))

- Source: https://android.googlesource.com/kernel/msm.git/+/refs/tags/android-14.0.0_r0.78/drivers/hid/hid-input.c#875
- Android key events: https://developer.android.com/reference/android/view/KeyEvent

| Key name                                            | Usage code | Android key code             | Comment                     |
|-----------------------------------------------------|------------|------------------------------|-----------------------------|
| CONSUMER_INCREMENT_10                               | 0x020      |                              |                             |
| CONSUMER_INCREMENT_100                              | 0x021      |                              |                             |
| CONSUMER_AM_PM                                      | 0x022      |                              |                             |
| CONSUMER_POWER                                      | 0x030      | KEY_POWER                    | Power toggle (sleep / wake) |
| CONSUMER_RESET                                      | 0x031      | KEY_RESTART                  |                             |
| CONSUMER_SLEEP                                      | 0x032      | KEY_SLEEP                    | Sleep, no wake              |
| CONSUMER_SLEEP_AFTER                                | 0x033      |                              |                             |
| CONSUMER_SLEEP_MODE                                 | 0x034      | KEY_SLEEP                    |                             |
| CONSUMER_ILLUMINATION                               | 0x035      | KEY_KBDILLUMTOGGLE           |                             |
| CONSUMER_FUNCTION_BUTTONS                           | 0x036      | BTN_MISC                     |                             |
| CONSUMER_MENU                                       | 0x040      | KEY_MENU                     | Menu                        |
| CONSUMER_MENU_PICK                                  | 0x041      | KEY_SELECT                   | Menu Pick                   |
| CONSUMER_MENU_UP                                    | 0x042      | KEY_UP                       | Menu Up                     |
| CONSUMER_MENU_DOWN                                  | 0x043      | KEY_DOWN                     | Menu Down                   |
| CONSUMER_MENU_LEFT                                  | 0x044      | KEY_LEFT                     | Menu Left                   |
| CONSUMER_MENU_RIGHT                                 | 0x045      | KEY_RIGHT                    | Menu Right                  |
| CONSUMER_MENU_ESCAPE                                | 0x046      | KEY_ESC                      | Menu Escape                 |
| CONSUMER_MENU_VALUE_INCREASE                        | 0x047      | KEY_KPPLUS                   | Menu Value Increase         |
| CONSUMER_MENU_VALUE_DECREASE                        | 0x048      | KEY_KPMINUS                  | Menu Value Decrease         |
| CONSUMER_DATA_ON_SCREEN                             | 0x060      | KEY_INFO                     | Data On Screen              |
| CONSUMER_CLOSED_CAPTION                             | 0x061      | KEY_SUBTITLE                 | Closed Caption              |
| CONSUMER_CLOSED_CAPTION_SELECT                      | 0x062      |                              |                             |
| CONSUMER_VCR_TV                                     | 0x063      | KEY_VCR                      | VCR/TV                      |
| CONSUMER_BROADCAST_MODE                             | 0x064      |                              |                             |
| CONSUMER_SNAPSHOT                                   | 0x065      | KEY_CAMERA                   | Snapshot                    |
| CONSUMER_STILL                                      | 0x066      |                              |                             |
| CONSUMER_PICTURE_IN_PICTURE_TOGGLE                  | 0x067      |                              |                             |
| CONSUMER_PICTURE_IN_PICTURE_SWAP                    | 0x068      |                              |                             |
| CONSUMER_RED_MENU_BUTTON                            | 0x069      | KEY_RED                      |                             |
| CONSUMER_GREEN_MENU_BUTTON                          | 0x06A      | KEY_GREEN                    |                             |
| CONSUMER_BLUE_MENU_BUTTON                           | 0x06B      | KEY_BLUE                     |                             |
| CONSUMER_YELLOW_MENU_BUTTON                         | 0x06C      | KEY_YELLOW                   |                             |
| CONSUMER_ASPECT                                     | 0x06D      | KEY_ZOOM                     |                             |
| CONSUMER_MODE_SELECT_3D                             | 0x06E      |                              |                             |
| CONSUMER_DISPLAY_BRIGHTNESS_INCREMENT               | 0x06F      | KEY_BRIGHTNESSUP             |                             |
| CONSUMER_DISPLAY_BRIGHTNESS_DECREMENT               | 0x070      | KEY_BRIGHTNESSDOWN           |                             |
| CONSUMER_DISPLAY_BRIGHTNESS                         | 0x071      |                              |                             |
| CONSUMER_DISPLAY_BACKLIGHT_TOGGLE                   | 0x072      | KEY_BRIGHTNESS_TOGGLE        |                             |
| CONSUMER_DISPLAY_SET_BRIGHTNESS_TO_MINIMUM          | 0x073      | KEY_BRIGHTNESS_MIN           |                             |
| CONSUMER_DISPLAY_SET_BRIGHTNESS_TO_MAXIMUM          | 0x074      | KEY_BRIGHTNESS_MAX           |                             |
| CONSUMER_DISPLAY_SET_AUTO_BRIGHTNESS                | 0x075      | KEY_BRIGHTNESS_AUTO          |                             |
| CONSUMER_CAMERA_ACCESS_ENABLED                      | 0x076      |                              |                             |
| CONSUMER_CAMERA_ACCESS_DISABLED                     | 0x077      |                              |                             |
| CONSUMER_CAMERA_ACCESS_TOGGLE                       | 0x078      |                              |                             |
| CONSUMER_KEYBOARD_BRIGHTNESS_INCREMENT              | 0x079      | KEY_KBDILLUMUP               |                             |
| CONSUMER_KEYBOARD_BRIGHTNESS_DECREMENT              | 0x07A      | KEY_KBDILLUMDOWN             |                             |
| CONSUMER_KEYBOARD_BACKLIGHT_SET_LEVEL               | 0x07B      |                              |                             |
| CONSUMER_KEYBOARD_BACKLIGHT_OOC                     | 0x07C      | KEY_KBDILLUMTOGGLE           |                             |
| CONSUMER_KEYBOARD_BACKLIGHT_SET_MINIMUM             | 0x07D      |                              |                             |
| CONSUMER_KEYBOARD_BACKLIGHT_SET_MAXIMUM             | 0x07E      |                              |                             |
| CONSUMER_KEYBOARD_BACKLIGHT_AUTO                    | 0x07F      |                              |                             |
| CONSUMER_SELECTION                                  | 0x080      |                              |                             |
| CONSUMER_ASSIGN_SELECTION                           | 0x081      |                              |                             |
| CONSUMER_MODE_STEP                                  | 0x082      | KEY_VIDEO_NEXT               |                             |
| CONSUMER_RECALL_LAST                                | 0x083      | KEY_LAST                     |                             |
| CONSUMER_ENTER_CHANNEL                              | 0x084      | KEY_ENTER                    |                             |
| CONSUMER_ORDER_MOVIE                                | 0x085      |                              |                             |
| CONSUMER_CHANNEL                                    | 0x086      |                              |                             |
| CONSUMER_MEDIA_SELECTION                            | 0x087      |                              |                             |
| CONSUMER_MEDIA_SELECT_COMPUTER                      | 0x088      | KEY_PC                       |                             |
| CONSUMER_MEDIA_SELECT_TV                            | 0x089      | KEY_TV                       |                             |
| CONSUMER_MEDIA_SELECT_WWW                           | 0x08A      | KEY_WWW                      |                             |
| CONSUMER_MEDIA_SELECT_DVD                           | 0x08B      | KEY_DVD                      |                             |
| CONSUMER_MEDIA_SELECT_TELEPHONE                     | 0x08C      | KEY_PHONE                    |                             |
| CONSUMER_MEDIA_SELECT_PROGRAM_GUIDE                 | 0x08D      | KEY_PROGRAM                  |                             |
| CONSUMER_MEDIA_SELECT_VIDEO_PHONE                   | 0x08E      | KEY_VIDEOPHONE               |                             |
| CONSUMER_MEDIA_SELECT_GAMES                         | 0x08F      | KEY_GAMES                    |                             |
| CONSUMER_MEDIA_SELECT_MESSAGES                      | 0x090      | KEY_MEMO                     |                             |
| CONSUMER_MEDIA_SELECT_CD                            | 0x091      | KEY_CD                       |                             |
| CONSUMER_MEDIA_SELECT_VCR                           | 0x092      | KEY_VCR                      |                             |
| CONSUMER_MEDIA_SELECT_TUNER                         | 0x093      | KEY_TUNER                    |                             |
| CONSUMER_QUIT                                       | 0x094      | KEY_EXIT                     |                             |
| CONSUMER_HELP                                       | 0x095      | KEY_HELP                     |                             |
| CONSUMER_MEDIA_SELECT_TAPE                          | 0x096      | KEY_TAPE                     |                             |
| CONSUMER_MEDIA_SELECT_CABLE                         | 0x097      | KEY_TV2                      |                             |
| CONSUMER_MEDIA_SELECT_SATELLITE                     | 0x098      | KEY_SAT                      |                             |
| CONSUMER_MEDIA_SELECT_SECURITY                      | 0x099      |                              |                             |
| CONSUMER_MEDIA_SELECT_HOME                          | 0x09A      | KEY_PVR                      |                             |
| CONSUMER_MEDIA_SELECT_CALL                          | 0x09B      |                              |                             |
| CONSUMER_CHANNEL_INCREMENT                          | 0x09C      | KEY_CHANNELUP                |                             |
| CONSUMER_CHANNEL_DECREMENT                          | 0x09D      | KEY_CHANNELDOWN              |                             |
| CONSUMER_MEDIA_SELECT_SAP                           | 0x09E      |                              |                             |
| CONSUMER_VCR_PLUS                                   | 0x0A0      | KEY_VCR2                     |                             |
| CONSUMER_ONCE                                       | 0x0A1      |                              |                             |
| CONSUMER_DAILY                                      | 0x0A2      |                              |                             |
| CONSUMER_WEEKLY                                     | 0x0A3      |                              |                             |
| CONSUMER_MONTHLY                                    | 0x0A4      |                              |                             |
| CONSUMER_PLAY                                       | 0x0B0      | KEY_PLAY                     |                             |
| CONSUMER_PAUSE                                      | 0x0B1      | KEY_PAUSE                    |                             |
| CONSUMER_RECORD                                     | 0x0B2      | KEY_RECORD                   |                             |
| CONSUMER_FAST_FORWARD                               | 0x0B3      | KEY_FASTFORWARD              |                             |
| CONSUMER_REWIND                                     | 0x0B4      | KEY_REWIND                   |                             |
| CONSUMER_SCAN_NEXT_TRACK                            | 0x0B5      | KEY_NEXTSONG                 |                             |
| CONSUMER_SCAN_PREVIOUS_TRACK                        | 0x0B6      | KEY_PREVIOUSSONG             |                             |
| CONSUMER_STOP                                       | 0x0B7      | KEY_STOPCD                   |                             |
| CONSUMER_EJECT                                      | 0x0B8      | KEY_EJECTCD                  |                             |
| CONSUMER_RANDOM_PLAY                                | 0x0B9      | KEY_SHUFFLE                  |                             |
| CONSUMER_SELECT_DISC                                | 0x0BA      |                              |                             |
| CONSUMER_ENTER_DISC                                 | 0x0BB      |                              |                             |
| CONSUMER_REPEAT                                     | 0x0BC      | KEY_MEDIA_REPEAT             |                             |
| CONSUMER_TRACKING                                   | 0x0BD      |                              |                             |
| CONSUMER_TRACK_NORMAL                               | 0x0BE      |                              |                             |
| CONSUMER_SLOW_TRACKING                              | 0x0BF      | KEY_SLOW                     |                             |
| CONSUMER_FRAME_FORWARD                              | 0x0C0      |                              |                             |
| CONSUMER_FRAME_BACK                                 | 0x0C1      |                              |                             |
| CONSUMER_MARK                                       | 0x0C2      |                              |                             |
| CONSUMER_CLEAR_MARK                                 | 0x0C3      |                              |                             |
| CONSUMER_REPEAT_FROM_MARK                           | 0x0C4      |                              |                             |
| CONSUMER_RETURN_TO_MARK                             | 0x0C5      |                              |                             |
| CONSUMER_SEARCH_MARK_FORWARD                        | 0x0C6      |                              |                             |
| CONSUMER_SEARCH_MARK_BACKWARDS                      | 0x0C7      |                              |                             |
| CONSUMER_COUNTER_RESET                              | 0x0C8      |                              |                             |
| CONSUMER_SHOW_COUNTER                               | 0x0C9      |                              |                             |
| CONSUMER_TRACKING_INCREMENT                         | 0x0CA      |                              |                             |
| CONSUMER_TRACKING_DECREMENT                         | 0x0CB      |                              |                             |
| CONSUMER_STOP_EJECT                                 | 0x0CC      |                              |                             |
| CONSUMER_PLAY_PAUSE                                 | 0x0CD      | KEY_PLAYPAUSE                |                             |
| CONSUMER_PLAY_SKIP                                  | 0x0CE      |                              |                             |
| CONSUMER_VOICE_COMMAND                              | 0x0CF      | KEY_VOICECOMMAND             |                             |
| CONSUMER_INVOKE_CAPTURE_INTERFACE                   | 0x0D0      |                              |                             |
| CONSUMER_START_OR_STOP_GAME_RECORDING               | 0x0D1      |                              |                             |
| CONSUMER_HISTORICAL_GAME_CAPTURE                    | 0x0D2      |                              |                             |
| CONSUMER_CAPTURE_GAME_SCREENSHOT                    | 0x0D3      |                              |                             |
| CONSUMER_SHOW_OR_HIDE_RECORDING_INDICATOR           | 0x0D4      |                              |                             |
| CONSUMER_START_OR_STOP_MICROPHONE_CAPTURE           | 0x0D5      |                              |                             |
| CONSUMER_START_OR_STOP_CAMERA_CAPTURE               | 0x0D6      |                              |                             |
| CONSUMER_START_OR_STOP_GAME_BROADCAST               | 0x0D7      |                              |                             |
| CONSUMER_VOLUME                                     | 0x0E0      | ABS_VOLUME                   |                             |
| CONSUMER_BALANCE                                    | 0x0E1      |                              |                             |
| CONSUMER_MUTE                                       | 0x0E2      | KEY_MUTE                     |                             |
| CONSUMER_BASS                                       | 0x0E3      |                              |                             |
| CONSUMER_TREBLE                                     | 0x0E4      |                              |                             |
| CONSUMER_BASS_BOOST                                 | 0x0E5      | KEY_BASSBOOST                |                             |
| CONSUMER_SURROUND_MODE                              | 0x0E6      |                              |                             |
| CONSUMER_LOUDNESS                                   | 0x0E7      |                              |                             |
| CONSUMER_MPX                                        | 0x0E8      |                              |                             |
| CONSUMER_VOLUME_INCREMENT                           | 0x0E9      | KEY_VOLUMEUP                 |                             |
| CONSUMER_VOLUME_DECREMENT                           | 0x0EA      | KEY_VOLUMEDOWN               |                             |
| CONSUMER_SPEED_SELECT                               | 0x0F0      |                              |                             |
| CONSUMER_PLAYBACK_SPEED                             | 0x0F1      |                              |                             |
| CONSUMER_STANDARD_PLAY                              | 0x0F2      |                              |                             |
| CONSUMER_LONG_PLAY                                  | 0x0F3      |                              |                             |
| CONSUMER_EXTENDED_PLAY                              | 0x0F4      |                              |                             |
| CONSUMER_SLOW                                       | 0x0F5      | KEY_SLOW                     |                             |
| CONSUMER_FAN_ENABLE                                 | 0x100      |                              |                             |
| CONSUMER_FAN_SPEED                                  | 0x101      |                              |                             |
| CONSUMER_LIGHT_ENABLE                               | 0x102      |                              |                             |
| CONSUMER_LIGHT_ILLUMINATION_LEVEL                   | 0x103      |                              |                             |
| CONSUMER_CLIMATE_CONTROL_ENABLE                     | 0x104      |                              |                             |
| CONSUMER_ROOM_TEMPERATURE                           | 0x105      |                              |                             |
| CONSUMER_SECURITY_ENABLE                            | 0x106      |                              |                             |
| CONSUMER_FIRE_ALARM                                 | 0x107      |                              |                             |
| CONSUMER_POLICE_ALARM                               | 0x108      |                              |                             |
| CONSUMER_PROXIMITY                                  | 0x109      |                              |                             |
| CONSUMER_MOTION                                     | 0x10A      |                              |                             |
| CONSUMER_DURESS_ALARM                               | 0x10B      |                              |                             |
| CONSUMER_HOLDUP_ALARM                               | 0x10C      |                              |                             |
| CONSUMER_MEDICAL_ALARM                              | 0x10D      |                              |                             |
| CONSUMER_BALANCE_RIGHT                              | 0x150      |                              |                             |
| CONSUMER_BALANCE_LEFT                               | 0x151      |                              |                             |
| CONSUMER_BASS_INCREMENT                             | 0x152      |                              |                             |
| CONSUMER_BASS_DECREMENT                             | 0x153      |                              |                             |
| CONSUMER_TREBLE_INCREMENT                           | 0x154      |                              |                             |
| CONSUMER_TREBLE_DECREMENT                           | 0x155      |                              |                             |
| CONSUMER_SPEAKER_SYSTEM                             | 0x160      |                              |                             |
| CONSUMER_CHANNEL_LEFT                               | 0x161      |                              |                             |
| CONSUMER_CHANNEL_RIGHT                              | 0x162      |                              |                             |
| CONSUMER_CHANNEL_CENTER                             | 0x163      |                              |                             |
| CONSUMER_CHANNEL_FRONT                              | 0x164      |                              |                             |
| CONSUMER_CHANNEL_CENTER_FRONT                       | 0x165      |                              |                             |
| CONSUMER_CHANNEL_SIDE                               | 0x166      |                              |                             |
| CONSUMER_CHANNEL_SURROUND                           | 0x167      |                              |                             |
| CONSUMER_CHANNEL_LOW_FREQUENCY_ENHANCEMENT          | 0x168      |                              |                             |
| CONSUMER_CHANNEL_TOP                                | 0x169      |                              |                             |
| CONSUMER_CHANNEL_UNKNOWN                            | 0x16A      |                              |                             |
| CONSUMER_SUB_CHANNEL                                | 0x170      |                              |                             |
| CONSUMER_SUB_CHANNEL_INCREMENT                      | 0x171      |                              |                             |
| CONSUMER_SUB_CHANNEL_DECREMENT                      | 0x172      |                              |                             |
| CONSUMER_ALTERNATE_AUDIO_INCREMENT                  | 0x173      |                              |                             |
| CONSUMER_ALTERNATE_AUDIO_DECREMENT                  | 0x174      |                              |                             |
| CONSUMER_APPLICATION_LAUNCH_BUTTONS                 | 0x180      |                              |                             |
| CONSUMER_AL_LAUNCH_BUTTON_CONFIGURATION_TOOL        | 0x181      | KEY_BUTTONCONFIG             |                             |
| CONSUMER_AL_PROGRAMMABLE_BUTTON_CONFIGURATION       | 0x182      | KEY_BOOKMARKS                |                             |
| CONSUMER_AL_CONSUMER_CONTROL_CONFIGURATION          | 0x183      | KEY_CONFIG                   |                             |
| CONSUMER_AL_WORD_PROCESSOR                          | 0x184      | KEY_WORDPROCESSOR            |                             |
| CONSUMER_AL_TEXT_EDITOR                             | 0x185      | KEY_EDITOR                   |                             |
| CONSUMER_AL_SPREADSHEET                             | 0x186      | KEY_SPREADSHEET              |                             |
| CONSUMER_AL_GRAPHICS_EDITOR                         | 0x187      | KEY_GRAPHICSEDITOR           |                             |
| CONSUMER_AL_PRESENTATION_APP                        | 0x188      | KEY_PRESENTATION             |                             |
| CONSUMER_AL_DATABASE_APP                            | 0x189      | KEY_DATABASE                 |                             |
| CONSUMER_AL_EMAIL_READER                            | 0x18A      | KEY_MAIL                     |                             |
| CONSUMER_AL_NEWSREADER                              | 0x18B      | KEY_NEWS                     |                             |
| CONSUMER_AL_VOICEMAIL                               | 0x18C      | KEY_VOICEMAIL                |                             |
| CONSUMER_AL_CONTACTS_ADDRESS_BOOK                   | 0x18D      | KEY_ADDRESSBOOK              |                             |
| CONSUMER_AL_CALENDAR_SCHEDULE                       | 0x18E      | KEY_CALENDAR                 |                             |
| CONSUMER_AL_TASK_PROJECT_MANAGER                    | 0x18F      | KEY_TASKMANAGER              |                             |
| CONSUMER_AL_LOG_JOURNAL_TIMECARD                    | 0x190      | KEY_JOURNAL                  |                             |
| CONSUMER_AL_CHECKBOOK_FINANCE                       | 0x191      | KEY_FINANCE                  |                             |
| CONSUMER_AL_CALCULATOR                              | 0x192      | KEY_CALC                     |                             |
| CONSUMER_AL_A_V_CAPTURE_PLAYBACK                    | 0x193      | KEY_PLAYER                   |                             |
| CONSUMER_AL_LOCAL_MACHINE_BROWSER                   | 0x194      | KEY_FILE                     |                             |
| CONSUMER_AL_LAN_WAN_BROWSER                         | 0x195      |                              |                             |
| CONSUMER_AL_INTERNET_BROWSER                        | 0x196      | KEY_WWW                      |                             |
| CONSUMER_AL_REMOTE_NETWORKING_ISP_CONNECT           | 0x197      |                              |                             |
| CONSUMER_AL_NETWORK_CONFERENCE                      | 0x198      |                              |                             |
| CONSUMER_AL_NETWORK_CHAT                            | 0x199      | KEY_CHAT                     |                             |
| CONSUMER_AL_TELEPHONY_DIALER                        | 0x19A      |                              |                             |
| CONSUMER_AL_LOGON                                   | 0x19B      |                              |                             |
| CONSUMER_AL_LOGOFF                                  | 0x19C      | KEY_LOGOFF                   |                             |
| CONSUMER_AL_LOGON_LOGOFF                            | 0x19D      |                              |                             |
| CONSUMER_AL_TERMINAL_LOCK_SCREENSAVER               | 0x19E      | KEY_COFFEE                   |                             |
| CONSUMER_AL_CONTROL_PANEL                           | 0x19F      | KEY_CONTROLPANEL             |                             |
| CONSUMER_AL_COMMAND_LINE_PROCESSOR_RUN              | 0x1A0      |                              |                             |
| CONSUMER_AL_PROCESS_TASK_MANAGER                    | 0x1A1      |                              |                             |
| CONSUMER_AL_SELECT_TASK_APPLICATION                 | 0x1A2      | KEY_APPSELECT                |                             |
| CONSUMER_AL_NEXT_TASK_APPLICATION                   | 0x1A3      | KEY_NEXT                     |                             |
| CONSUMER_AL_PREVIOUS_TASK_APPLICATION               | 0x1A4      | KEY_PREVIOUS                 |                             |
| CONSUMER_AL_PREEMPTIVE_HALT_TASK_APPLICATION        | 0x1A5      |                              |                             |
| CONSUMER_AL_INTEGRATED_HELP_CENTER                  | 0x1A6      | KEY_HELP                     |                             |
| CONSUMER_AL_DOCUMENTS                               | 0x1A7      | KEY_DOCUMENTS                |                             |
| CONSUMER_AL_THESAURUS                               | 0x1A8      |                              |                             |
| CONSUMER_AL_DICTIONARY                              | 0x1A9      |                              |                             |
| CONSUMER_AL_DESKTOP                                 | 0x1AA      |                              |                             |
| CONSUMER_AL_SPELL_CHECK                             | 0x1AB      | KEY_SPELLCHECK               |                             |
| CONSUMER_AL_GRAMMAR_CHECK                           | 0x1AC      |                              |                             |
| CONSUMER_AL_WIRELESS_STATUS                         | 0x1AD      |                              |                             |
| CONSUMER_AL_KEYBOARD_LAYOUT                         | 0x1AE      | KEY_KEYBOARD                 |                             |
| CONSUMER_AL_VIRUS_PROTECTION                        | 0x1AF      |                              |                             |
| CONSUMER_AL_ENCRYPTION                              | 0x1B0      |                              |                             |
| CONSUMER_AL_SCREEN_SAVER                            | 0x1B1      | KEY_SCREENSAVER              |                             |
| CONSUMER_AL_ALARMS                                  | 0x1B2      |                              |                             |
| CONSUMER_AL_CLOCK                                   | 0x1B3      |                              |                             |
| CONSUMER_AL_FILE_BROWSER                            | 0x1B4      | KEY_FILE                     |                             |
| CONSUMER_AL_POWER_STATUS                            | 0x1B5      |                              |                             |
| CONSUMER_AL_IMAGE_BROWSER                           | 0x1B6      | KEY_IMAGES                   |                             |
| CONSUMER_AL_AUDIO_BROWSER                           | 0x1B7      | KEY_AUDIO                    |                             |
| CONSUMER_AL_MOVIE_BROWSER                           | 0x1B8      | KEY_VIDEO                    |                             |
| CONSUMER_AL_DIGITAL_RIGHTS_MANAGER                  | 0x1B9      |                              |                             |
| CONSUMER_AL_DIGITAL_WALLET                          | 0x1BA      |                              |                             |
| CONSUMER_AL_INSTANT_MESSAGING                       | 0x1BC      | KEY_MESSENGER                |                             |
| CONSUMER_AL_OEM_FEATURES_TIPS_TUTORIAL_BROWSER      | 0x1BD      | KEY_INFO                     |                             |
| CONSUMER_AL_OEM_HELP                                | 0x1BE      |                              |                             |
| CONSUMER_AL_ONLINE_COMMUNITY                        | 0x1BF      |                              |                             |
| CONSUMER_AL_ENTERTAINMENT_CONTENT_BROWSER           | 0x1C0      |                              |                             |
| CONSUMER_AL_ONLINE_SHOPPING_BROWSER                 | 0x1C1      |                              |                             |
| CONSUMER_AL_SMARTCARD_INFORMATION_HELP              | 0x1C2      |                              |                             |
| CONSUMER_AL_MARKET_MONITOR_FINANCE_BROWSER          | 0x1C3      |                              |                             |
| CONSUMER_AL_CUSTOMIZED_CORPORATE_NEWS_BROWSER       | 0x1C4      |                              |                             |
| CONSUMER_AL_ONLINE_ACTIVITY_BROWSER                 | 0x1C5      |                              |                             |
| CONSUMER_AL_RESEARCH_SEARCH_BROWSER                 | 0x1C6      |                              |                             |
| CONSUMER_AL_AUDIO_PLAYER                            | 0x1C7      |                              |                             |
| CONSUMER_AL_MESSAGE_STATUS                          | 0x1C8      |                              |                             |
| CONSUMER_AL_CONTACT_SYNC                            | 0x1C9      |                              |                             |
| CONSUMER_AL_NAVIGATION                              | 0x1CA      |                              |                             |
| CONSUMER_AL_CONTEXT_AWARE_DESKTOP_ASSISTANT         | 0x1CB      | KEY_ASSISTANT                |                             |
| CONSUMER_GENERIC_GUI_APPLICATION_CONTROLS           | 0x200      |                              |                             |
| CONSUMER_AC_NEW                                     | 0x201      | KEY_NEW                      |                             |
| CONSUMER_AC_OPEN                                    | 0x202      | KEY_OPEN                     |                             |
| CONSUMER_AC_CLOSE                                   | 0x203      | KEY_CLOSE                    |                             |
| CONSUMER_AC_EXIT                                    | 0x204      | KEY_EXIT                     |                             |
| CONSUMER_AC_MAXIMIZE                                | 0x205      |                              |                             |
| CONSUMER_AC_MINIMIZE                                | 0x206      |                              |                             |
| CONSUMER_AC_SAVE                                    | 0x207      | KEY_SAVE                     |                             |
| CONSUMER_AC_PRINT                                   | 0x208      | KEY_PRINT                    |                             |
| CONSUMER_AC_PROPERTIES                              | 0x209      | KEY_PROPS                    |                             |
| CONSUMER_AC_UNDO                                    | 0x21A      | KEY_UNDO                     |                             |
| CONSUMER_AC_COPY                                    | 0x21B      | KEY_COPY                     |                             |
| CONSUMER_AC_CUT                                     | 0x21C      | KEY_CUT                      |                             |
| CONSUMER_AC_PASTE                                   | 0x21D      | KEY_PASTE                    |                             |
| CONSUMER_AC_SELECT_ALL                              | 0x21E      |                              |                             |
| CONSUMER_AC_FIND                                    | 0x21F      | KEY_FIND                     |                             |
| CONSUMER_AC_FIND_AND_REPLACE                        | 0x220      |                              |                             |
| CONSUMER_AC_SEARCH                                  | 0x221      | KEY_SEARCH                   |                             |
| CONSUMER_AC_GO_TO                                   | 0x222      | KEY_GOTO                     |                             |
| CONSUMER_AC_HOME                                    | 0x223      | KEY_HOMEPAGE                 |                             |
| CONSUMER_AC_BACK                                    | 0x224      | KEY_BACK                     |                             |
| CONSUMER_AC_FORWARD                                 | 0x225      | KEY_FORWARD                  |                             |
| CONSUMER_AC_STOP                                    | 0x226      | KEY_STOP                     |                             |
| CONSUMER_AC_REFRESH                                 | 0x227      | KEY_REFRESH                  |                             |
| CONSUMER_AC_PREVIOUS_LINK                           | 0x228      |                              |                             |
| CONSUMER_AC_NEXT_LINK                               | 0x229      |                              |                             |
| CONSUMER_AC_BOOKMARKS                               | 0x22A      | KEY_BOOKMARKS                |                             |
| CONSUMER_AC_HISTORY                                 | 0x22B      |                              |                             |
| CONSUMER_AC_SUBSCRIPTIONS                           | 0x22C      |                              |                             |
| CONSUMER_AC_ZOOM_IN                                 | 0x22D      | KEY_ZOOMIN                   |                             |
| CONSUMER_AC_ZOOM_OUT                                | 0x22E      | KEY_ZOOMOUT                  |                             |
| CONSUMER_AC_ZOOM                                    | 0x22F      | KEY_ZOOMRESET                |                             |
| CONSUMER_AC_FULL_SCREEN_VIEW                        | 0x230      |                              |                             |
| CONSUMER_AC_NORMAL_VIEW                             | 0x231      |                              |                             |
| CONSUMER_AC_VIEW_TOGGLE                             | 0x232      |                              |                             |
| CONSUMER_AC_SCROLL_UP                               | 0x233      | KEY_SCROLLUP                 |                             |
| CONSUMER_AC_SCROLL_DOWN                             | 0x234      | KEY_SCROLLDOWN               |                             |
| CONSUMER_AC_SCROLL                                  | 0x235      |                              |                             |
| CONSUMER_AC_PAN_LEFT                                | 0x236      |                              |                             |
| CONSUMER_AC_PAN_RIGHT                               | 0x237      |                              |                             |
| CONSUMER_AC_PAN                                     | 0x238      | REL_HWHEEL                   |                             |
| CONSUMER_AC_NEW_WINDOW                              | 0x239      |                              |                             |
| CONSUMER_AC_TILE_HORIZONTALLY                       | 0x23A      |                              |                             |
| CONSUMER_AC_TILE_VERTICALLY                         | 0x23B      |                              |                             |
| CONSUMER_AC_FORMAT                                  | 0x23C      |                              |                             |
| CONSUMER_AC_EDIT                                    | 0x23D      | KEY_EDIT                     |                             |
| CONSUMER_AC_BOLD                                    | 0x23E      |                              |                             |
| CONSUMER_AC_ITALICS                                 | 0x23F      |                              |                             |
| CONSUMER_AC_UNDERLINE                               | 0x240      |                              |                             |
| CONSUMER_AC_STRIKETHROUGH                           | 0x241      |                              |                             |
| CONSUMER_AC_SUBSCRIPT                               | 0x242      |                              |                             |
| CONSUMER_AC_SUPERSCRIPT                             | 0x243      |                              |                             |
| CONSUMER_AC_ALL_CAPS                                | 0x244      |                              |                             |
| CONSUMER_AC_ROTATE                                  | 0x245      |                              |                             |
| CONSUMER_AC_RESIZE                                  | 0x246      |                              |                             |
| CONSUMER_AC_FLIP_HORIZONTAL                         | 0x247      |                              |                             |
| CONSUMER_AC_FLIP_VERTICAL                           | 0x248      |                              |                             |
| CONSUMER_AC_MIRROR_HORIZONTAL                       | 0x249      |                              |                             |
| CONSUMER_AC_MIRROR_VERTICAL                         | 0x24A      |                              |                             |
| CONSUMER_AC_FONT_SELECT                             | 0x24B      |                              |                             |
| CONSUMER_AC_FONT_COLOR                              | 0x24C      |                              |                             |
| CONSUMER_AC_FONT_SIZE                               | 0x24D      |                              |                             |
| CONSUMER_AC_JUSTIFY_LEFT                            | 0x24E      |                              |                             |
| CONSUMER_AC_JUSTIFY_CENTER_H                        | 0x24F      |                              |                             |
| CONSUMER_AC_JUSTIFY_RIGHT                           | 0x250      |                              |                             |
| CONSUMER_AC_JUSTIFY_BLOCK_H                         | 0x251      |                              |                             |
| CONSUMER_AC_JUSTIFY_TOP                             | 0x252      |                              |                             |
| CONSUMER_AC_JUSTIFY_CENTER_V                        | 0x253      |                              |                             |
| CONSUMER_AC_JUSTIFY_BOTTOM                          | 0x254      |                              |                             |
| CONSUMER_AC_JUSTIFY_BLOCK_V                         | 0x255      |                              |                             |
| CONSUMER_AC_INDENT_DECREASE                         | 0x256      |                              |                             |
| CONSUMER_AC_INDENT_INCREASE                         | 0x257      |                              |                             |
| CONSUMER_AC_NUMBERED_LIST                           | 0x258      |                              |                             |
| CONSUMER_AC_RESTART_NUMBERING                       | 0x259      |                              |                             |
| CONSUMER_AC_BULLETED_LIST                           | 0x25A      |                              |                             |
| CONSUMER_AC_PROMOTE                                 | 0x25B      |                              |                             |
| CONSUMER_AC_DEMOTE                                  | 0x25C      |                              |                             |
| CONSUMER_AC_YES                                     | 0x25D      |                              |                             |
| CONSUMER_AC_NO                                      | 0x25E      |                              |                             |
| CONSUMER_AC_CANCEL                                  | 0x25F      | KEY_CANCEL                   |                             |
| CONSUMER_AC_CATALOG                                 | 0x260      |                              |                             |
| CONSUMER_AC_BUY_CHECKOUT                            | 0x261      |                              |                             |
| CONSUMER_AC_ADD_TO_CART                             | 0x262      |                              |                             |
| CONSUMER_AC_EXPAND                                  | 0x263      |                              |                             |
| CONSUMER_AC_EXPAND_ALL                              | 0x264      |                              |                             |
| CONSUMER_AC_COLLAPSE                                | 0x265      |                              |                             |
| CONSUMER_AC_COLLAPSE_ALL                            | 0x266      |                              |                             |
| CONSUMER_AC_PRINT_PREVIEW                           | 0x267      |                              |                             |
| CONSUMER_AC_PASTE_SPECIAL                           | 0x268      |                              |                             |
| CONSUMER_AC_INSERT_MODE                             | 0x269      | KEY_INSERT                   |                             |
| CONSUMER_AC_DELETE                                  | 0x26A      | KEY_DELETE                   |                             |
| CONSUMER_AC_LOCK                                    | 0x26B      |                              |                             |
| CONSUMER_AC_UNLOCK                                  | 0x26C      |                              |                             |
| CONSUMER_AC_PROTECT                                 | 0x26D      |                              |                             |
| CONSUMER_AC_UNPROTECT                               | 0x26E      |                              |                             |
| CONSUMER_AC_ATTACH_COMMENT                          | 0x26F      |                              |                             |
| CONSUMER_AC_DELETE_COMMENT                          | 0x270      |                              |                             |
| CONSUMER_AC_VIEW_COMMENT                            | 0x271      |                              |                             |
| CONSUMER_AC_SELECT_WORD                             | 0x272      |                              |                             |
| CONSUMER_AC_SELECT_SENTENCE                         | 0x273      |                              |                             |
| CONSUMER_AC_SELECT_PARAGRAPH                        | 0x274      |                              |                             |
| CONSUMER_AC_SELECT_COLUMN                           | 0x275      |                              |                             |
| CONSUMER_AC_SELECT_ROW                              | 0x276      |                              |                             |
| CONSUMER_AC_SELECT_TABLE                            | 0x277      |                              |                             |
| CONSUMER_AC_SELECT_OBJECT                           | 0x278      |                              |                             |
| CONSUMER_AC_REDO_REPEAT                             | 0x279      | KEY_REDO                     |                             |
| CONSUMER_AC_SORT                                    | 0x27A      |                              |                             |
| CONSUMER_AC_SORT_ASCENDING                          | 0x27B      |                              |                             |
| CONSUMER_AC_SORT_DESCENDING                         | 0x27C      |                              |                             |
| CONSUMER_AC_FILTER                                  | 0x27D      |                              |                             |
| CONSUMER_AC_SET_CLOCK                               | 0x27E      |                              |                             |
| CONSUMER_AC_VIEW_CLOCK                              | 0x27F      |                              |                             |
| CONSUMER_AC_SELECT_TIME_ZONE                        | 0x280      |                              |                             |
| CONSUMER_AC_EDIT_TIME_ZONES                         | 0x281      |                              |                             |
| CONSUMER_AC_SET_ALARM                               | 0x282      |                              |                             |
| CONSUMER_AC_CLEAR_ALARM                             | 0x283      |                              |                             |
| CONSUMER_AC_SNOOZE_ALARM                            | 0x284      |                              |                             |
| CONSUMER_AC_RESET_ALARM                             | 0x285      |                              |                             |
| CONSUMER_AC_SYNCHRONIZE                             | 0x286      |                              |                             |
| CONSUMER_AC_SEND_RECEIVE                            | 0x287      |                              |                             |
| CONSUMER_AC_SEND_TO                                 | 0x288      |                              |                             |
| CONSUMER_AC_REPLY                                   | 0x289      | KEY_REPLY                    |                             |
| CONSUMER_AC_REPLY_ALL                               | 0x28A      |                              |                             |
| CONSUMER_AC_FORWARD_MSG                             | 0x28B      | KEY_FORWARDMAIL              |                             |
| CONSUMER_AC_SEND                                    | 0x28C      | KEY_SEND                     |                             |
| CONSUMER_AC_ATTACH_FILE                             | 0x28D      |                              |                             |
| CONSUMER_AC_UPLOAD                                  | 0x28E      |                              |                             |
| CONSUMER_AC_DOWNLOAD_SAVE_TARGET_AS                 | 0x28F      |                              |                             |
| CONSUMER_AC_SET_BORDERS                             | 0x290      |                              |                             |
| CONSUMER_AC_INSERT_ROW                              | 0x291      |                              |                             |
| CONSUMER_AC_INSERT_COLUMN                           | 0x292      |                              |                             |
| CONSUMER_AC_INSERT_FILE                             | 0x293      |                              |                             |
| CONSUMER_AC_INSERT_PICTURE                          | 0x294      |                              |                             |
| CONSUMER_AC_INSERT_OBJECT                           | 0x295      |                              |                             |
| CONSUMER_AC_INSERT_SYMBOL                           | 0x296      |                              |                             |
| CONSUMER_AC_SAVE_AND_CLOSE                          | 0x297      |                              |                             |
| CONSUMER_AC_RENAME                                  | 0x298      |                              |                             |
| CONSUMER_AC_MERGE                                   | 0x299      |                              |                             |
| CONSUMER_AC_SPLIT                                   | 0x29A      |                              |                             |
| CONSUMER_AC_DISRIBUTE_HORIZONTALLY                  | 0x29B      |                              |                             |
| CONSUMER_AC_DISTRIBUTE_VERTICALLY                   | 0x29C      |                              |                             |
| CONSUMER_AC_NEXT_KEYBOARD_LAYOUT_SELECT             | 0x29D      |                              |                             |
| CONSUMER_AC_NAVIGATION_GUIDANCE                     | 0x29E      |                              |                             |
| CONSUMER_AC_DESKTOP_SHOW_ALL_WINDOWS                | 0x29F      |                              |                             |
| CONSUMER_AC_SOFT_KEY_LEFT                           | 0x2A0      |                              |                             |
| CONSUMER_AC_SOFT_KEY_RIGHT                          | 0x2A1      |                              |                             |
| CONSUMER_AC_DESKTOP_SHOW_ALL_APPLICATIONS           | 0x2A2      | KEY_ALL_APPLICATIONS         |                             |
| CONSUMER_AC_IDLE_KEEP_ALIVE                         | 0x2B0      |                              |                             |
| CONSUMER_EXTENDED_KEYBOARD_ATTRIBUTES_COLLECTION    | 0x2C0      |                              |                             |
| CONSUMER_KEYBOARD_FORM_FACTOR                       | 0x2C1      |                              |                             |
| CONSUMER_KEYBOARD_KEY_TYPE                          | 0x2C2      |                              |                             |
| CONSUMER_KEYBOARD_PHYSICAL_LAYOUT                   | 0x2C3      |                              |                             |
| CONSUMER_VENDOR_SPECIFIC_KEYBOARD_PHYSICAL_LAYOUT   | 0x2C4      |                              |                             |
| CONSUMER_KEYBOARD_IETF_LANGUAGE_TAG_INDEX           | 0x2C5      |                              |                             |
| CONSUMER_IMPLEMENTED_KEYBOARD_INPUT_ASSIST_CONTROLS | 0x2C6      |                              |                             |
| CONSUMER_KEYBOARD_INPUT_ASSIST_PREVIOUS             | 0x2C7      | KEY_KBDINPUTASSIST_PREV      |                             |
| CONSUMER_KEYBOARD_INPUT_ASSIST_NEXT                 | 0x2C8      | KEY_KBDINPUTASSIST_NEXT      |                             |
| CONSUMER_KEYBOARD_INPUT_ASSIST_PREVIOUS_GROUP       | 0x2C9      | KEY_KBDINPUTASSIST_PREVGROUP |                             |
| CONSUMER_KEYBOARD_INPUT_ASSIST_NEXT_GROUP           | 0x2CA      | KEY_KBDINPUTASSIST_NEXTGROUP |                             |
| CONSUMER_KEYBOARD_INPUT_ASSIST_ACCEPT               | 0x2CB      | KEY_KBDINPUTASSIST_ACCEPT    |                             |
| CONSUMER_KEYBOARD_INPUT_ASSIST_CANCEL               | 0x2CC      | KEY_KBDINPUTASSIST_CANCEL    |                             |
|                                                     | 0x29f      | KEY_SCALE                    |                             |

## System Controls (Generic Desktop Page (0x01))

- Source: <https://android.googlesource.com/kernel/msm.git/+/refs/tags/android-14.0.0_r0.78/drivers/hid/hid-input.c#664>

| Key name             | Usage code | Android key code | Comment                                  |
|----------------------|------------|------------------|------------------------------------------|
| SYSTEM_POWER_DOWN    | 0x81       | KEY_POWER        |                                          |
| SYSTEM_SLEEP         | 0x82       | KEY_SLEEP        | Sleep                                    |
| SYSTEM_WAKE_UP       | 0x83       | KEY_WAKEUP       | Wake up                                  |
| SYSTEM_CONTEXT_MENU  | 0x84       | KEY_CONTEXT_MENU |                                          |
| SYSTEM_MAIN_MENU     | 0x85       | KEY_MENU         |                                          |
| SYSTEM_APP_MENU      | 0x86       | KEY_PROG1        |                                          |
| SYSTEM_MENU_HELP     | 0x87       | KEY_HELP         |                                          |
| SYSTEM_MENU_EXIT     | 0x88       | KEY_EXIT         |                                          |
| SYSTEM_MENU_SELECT   | 0x89       | KEY_SELECT       |                                          |
| SYSTEM_MENU_RIGHT    | 0x8a       | KEY_RIGHT        |                                          |
| SYSTEM_MENU_LEFT     | 0x8b       | KEY_LEFT         |                                          |
| SYSTEM_MENU_UP       | 0x8c       | KEY_UP           |                                          |
| SYSTEM_MENU_DOWN     | 0x8d       | KEY_DOWN         |                                          |
| SYSTEM_COLD_RESTART  | 0x8e       | KEY_POWER2       |                                          |
| SYSTEM_WARM_RESTART  | 0x8f       | KEY_RESTART      |                                          |
