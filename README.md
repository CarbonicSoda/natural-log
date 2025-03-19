<p align="center">
	<img src="https://raw.githubusercontent.com/CarbonicSoda/natural-log/master/media/icon.png" width="100" alt="Natural Log Icon">
</p>
<h3 align="center">Natural Log</h3>
<p align="center">Console and Popups All in One</p>

---

### Usage

Install this package in your project:

```bash
# via npm
npm add natural-log

# or pnpm
pnpm add natural-log

# or yarn
yarn add natural-log
```

Import the package and initialize:

```tsx
// index.tsx
import { Natlog } from "natural-log";

// initialize at top of file (recommended)
new Natlog();

// or with options
new Natlog({...});
```

> Available options are given in [configurations](#options).

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

![Overview](https://github.com/CarbonicSoda/natural-log/blob/master/media/demo/overview.png?raw=true)

Isn't that cool? Frees our hands from the debug console...! (Though the message
will still reach the debug console if you like to inspect it there)

> The popups are responsive to device size.

The popups will fade after some time. To dismiss them, just hover and click
(will not dismiss if you selected text in it).

![Hover&Click](https://github.com/CarbonicSoda/natural-log/blob/master/media/demo/hover.png?raw=true)

The package allows you to store console history, and exposes it to the debug
console via `natlog.history`.

> All exposed properties are given in [exposed object](#exposed-natlog-object).

On a production build? Not only can you toggle popups off, you can also mute all
native console calls with ease.

All configuration options are given below.

#### Options

> All properties have full Typescript autocompletion support and have
> straightforward values.

| Property        | Description                                                                                                                                                                                                                                                                                                             | Default                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| _console_       | A boolean or an array of strings defining the log level, where boolean is toggle all.<br><br>For instance, `["log", "error"]` will mute all other console methods except `console.log` and `console.error`.<br><br>For production builds you can set it to e.g. `false` or `["error"]` to mute certain console methods. | `true`                                                                                 |
| _popup_         | Same as options.console except it configures popups instead.<br><br>Currently, the only methods supported are `"log"`, `"warn"` and `"error"`, but you may fork and easily add support for new methods in no time following memos in src/.                                                                              | `true`                                                                                 |
| _maxPopupCount_ | How many popups can be shown on the page at the same time. If exceeds this number, the oldest one present would be removed.                                                                                                                                                                                             | `5`                                                                                    |
| _popupTimeout_  | How long a popup would last before fading away, measured in seconds.                                                                                                                                                                                                                                                    | `20`                                                                                   |
| _popupSep_      | `"newline"` or `"space"`, decides what to insert between items in the popup.<br><br>Unlike in the console, spaces can make the log ambiguous, thus newlines are recommended.                                                                                                                                            | `"newline"`                                                                            |
| _history_       | Toggles console history on or off.<br><br>If on, the console history can be accessed via the debug console variable `natlog.history` (along with some other information) even if console is muted.<br><br>For production builds, set to `false` for performance.                                                        | `true`                                                                                 |
| _timeOptions_   | Refer to [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat), decides how the timestamps in console history are formatted.                                                                                                                      | `{ hour: "2-digit", minute: "2-digit", second: "2-digit", fractionalSecondDigits: 3 }` |

#### Exposed `natlog` Object

A `natlog` object is exposed to the debug console, and can be accessed directly
without prefix.

It contains the following properties useful for further references, e.g. when
you logged a circular object (which the popup will give you a hint).

| Property  | Description                                                     |
| --------- | --------------------------------------------------------------- |
| _options_ | The natlog options you configured.                              |
| _console_ | The native console (after configured mute) that will not popup. |
| _history_ | The console history, if enabled.                                |
| _now_     | The current timestamp formatted like in the console history.    |

#### End

The main use case is debugging on phones/tablets without access to the debug
console (assuming you are not using an emulator).

Though this is still very useful for PC since animations with GSAP etc. may lag
the hell out of the debug console.

---

_&emsp;So who told you console hijacking is a bad idea...?_  
_&emsp;&emsp;You thought it's the maths one?_
