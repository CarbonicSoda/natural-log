<h3 align="center" style="margin-bottom: -10px">
	<img src="https://raw.githubusercontent.com/CarbonicSoda/natural-logs/master/media/icon.png" width="100" alt="Natural Logs Icon">
	<p></p>
	Natural Logs
</h3>
<h4 align="center">All-in-One Console and Popups</h4>

---

<h4 align="center">Ultimate Productivity Booster</h5>

### Usage

Install this package in your project:

```bash
# via npm
npm add natural-logs

# or pnpm
pnpm add natural-logs

# or yarn etc
```

Import the package:

```tsx
// index.tsx
import { Natlog } from "natural-logs";

// Refer to the next section for options
new Natlog({...});
```

Now, the next time console methods are called (even in the debug console), a
popup will appear on your page!

```tsx
// demo.tsx
console.log("Hello World!");
console.warn("Ouch");
console.error({
	cause: 69,
});
```

gives you...

![Overview](https://github.com/CarbonicSoda/natural-logs/blob/master/media/demo/overview.png?raw=true)

Isn't that cool? Frees our hands from the debug console...! (Though the message
will still reach the debug console if you like to inspect it there)

> The popups are responsive to device size and adaptive to the color scheme
> (light/dark).

The popups will fade after some time, to dismiss them, just hover and click.

![Hover&Click](https://github.com/CarbonicSoda/natural-logs/blob/master/media/demo/hover.png?raw=true)

The package allows you to store console history, and exposed it to the debug
console via `natlog.history`.

On a production build? Not only can you toggle popups off, you can also mute all
native console calls with ease.

All configuration options are given below.

#### Options

> All properties have full Typescript autocompletion support and have
> straightforward values.

| Property        | Description                                                                                                                                                                                                                                                                               | Default                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| _console_       | A boolean or an array of strings defining the log level.<br><br>For instance, `["log", "error"]` will mute all other console methods except `console.log` and `console.error`.<br><br>Toggles all if boolean, on production builds you may set it to `false` to mute all console methods. | `true`                                                                                 |
| _popup_         | Same as options.console except it configurates popups instead.<br><br>Currently, the only methods supported are `"log"`, `"warn"` and `"error"`, but you may fork and easily add support for new methods in no time.                                                                      | `true`                                                                                 |
| _maxPopupCount_ | How many popups can be shown on the page at the same time. If exceeds this number, the oldest one present would be removed.                                                                                                                                                               | `5`                                                                                    |
| _popupTimeout_  | How long a popup would last before fading away, measured in seconds.                                                                                                                                                                                                                      | `30`                                                                                   |
| _popupSep_      | `"newline"` or `"space"`, decides what to insert between items in the popup.<br><br>Unlike in the console, spaces can make the log ambiguous, thus newlines are recommended.                                                                                                              | `"newline"`                                                                            |
| _history_       | Toggles console history on or off.<br><br>If on, the console history can be accessed via the debug console variable `natlog.history` (along with some other information) even if console is muted.                                                                                        | `true`                                                                                 |
| _timeOptions_   | Refer to [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat), decides how the timestamps in console history are formatted.                                                                                        | `{ hour: "2-digit", minute: "2-digit", second: "2-digit", fractionalSecondDigits: 3 }` |

Sooo... have fun boosting your debugging efficiency!

The main use case is perhaps debugging on phones/tablets without access to the
debug console (assuming you are not using an emulator).

Though this is still very useful for PC since GSAP etc may lag the hell out of
the debug console lol.

---

_&emsp;Who told ya console hijacking is a bad idea...?_
