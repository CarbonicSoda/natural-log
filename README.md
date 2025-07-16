<h3 align="center">
  <img src="https://raw.githubusercontent.com/CarbonicSoda/natural-log/master/media/icon.png" width="130" alt="Natural Log Icon" /><br />
  Natural Log
</h3>
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
import { natlog } from "natural-log";

// initialize
natlog();

// with options
natlog({...});
```

> Available options are given in [Options](#options).

Now, the next time console methods are called (even in the debug console), prompts will appear on
your page! Different console methods result in different prompt colors, too.

![Demo](https://github.com/CarbonicSoda/natural-log/blob/master/media/demo/demo.png?raw=true)

> You can expand/collapse objects, arrays etc. all thanks to
> [Omnires](https://github.com/CarbonicSoda/omnires)!

> The prompts are responsive with regards to device size.

Isn't that cool? Frees our hands from the debug console...!  
(Though the message will still reach the debug console, if you like to inspect it there)

The prompts would fade after some time if not being inspected. To dismiss them manually, just hit
the cross.

![Dismiss](https://github.com/CarbonicSoda/natural-log/blob/master/media/demo/dismiss.png?raw=true)

The package also stores console history, and exposes it to the debug console via `natlog.history`.

> Details on the exposed object in [Exposed Object](#exposed-object).

#### Options

| Property | Description                                                                                                                                                                                                                                                                   | Default |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| console  | Boolean or array of method names defining the log level.<br>For instance, `["log", "error"]` will mute all other console methods except `console.log` and `console.error`.<br>For production builds you can set it to `false` or `["error"]` to mute certain console methods. | `true`  |
| prompts  | Same as `options.console` except it configures prompts instead.                                                                                                                                                                                                               | `true`  |
| history  | Toggle console history.<br>If on, the console history can be accessed via the debug console variable `natlog.history`, even if methods are muted.<br>For production builds, set to `false` for performance.                                                                   | `true`  |
| timeout  | Duration a prompt would last before fading away in seconds, if the prompt is not being inspected.                                                                                                                                                                             | `20`    |
| maximum  | Number of prompts that could be shown on the page at the same time.<br>The oldest prompt present would be removed if the number exceeds the maximum.                                                                                                                          | `5`     |

#### Exposed Object

A `natlog` object is exposed to the debug console which could be accessed directly. The same object
is also returned by the `natlog()` initializer.

It contains the following useful properties.

| Property | Description                                                      |
| -------- | ---------------------------------------------------------------- |
| options  | The resolved natural-log options.                                |
| console  | The native console after muting which would not trigger prompts. |
| history  | The console history stack, if history is enabled in options.     |
| now()    | The current timestamp in the same format as history entries.     |
| root     | The natural-log root prompts element.                            |

#### Notes

The package is mainly for debugging on phones and tablets, or when the debug console is lagging like
hell because of GSAP etc.

---

_&emsp;You thought it's the maths one?_
