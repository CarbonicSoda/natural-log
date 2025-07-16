import { render } from "omnires";
import { getStyle } from "../registry/registry";
import { default as styles } from "../styles/styles.css";
import { Log } from "../types/log";
import { Method } from "../types/method";
import { Options } from "../types/options";
import { Runtime } from "../types/runtime";
import { create, stylize } from "../utils/dom";
import { now } from "../utils/now";
import { root } from "./root";

const runtime: Runtime = {
	options: {
		console: true,
		prompts: true,

		history: true,

		timeout: 20,
		maximum: 5,
	},

	console: window.console,
	history: [],
	now,

	root: root(),
};

/**
 * Initialize natural-log in your web application.
 *
 * @param options
 * refer to [readme#options](https://github.com/CarbonicSoda/natural-log/tree/master?tab=readme-ov-file#options).
 *
 * @returns natural-log runtime object
 */
export function natlog(options?: Partial<Options>): Runtime {
	window.natlog = runtime;
	Object.assign(runtime.options, options);

	window.console = {} as Console;

	for (const method of Object.keys(runtime.console) as Method[]) {
		if (!queryConsole(method)) {
			runtime.console[method] = () => void 0;
		}

		window.console[method] = (...args: unknown[]) => {
			const log: Log = { type: method, time: runtime.now(), args };

			if (runtime.options.history) {
				runtime.history.push(log);
			}

			if (queryPrompts(method)) {
				promptFactory(method)(log);
			}

			(runtime.console[method] as (...args: unknown[]) => void)(...args);
		};
	}

	if (
		Array.isArray(runtime.options.prompts)
			? runtime.options.prompts.length !== 0
			: runtime.options.prompts
	) {
		stylize(styles);
	}

	return runtime;
}

function queryConsole(method: Method): boolean {
	return Array.isArray(runtime.options.console)
		? runtime.options.console.includes(method)
		: runtime.options.console;
}

function queryPrompts(method: Method): boolean {
	return Array.isArray(runtime.options.prompts)
		? runtime.options.prompts.includes(method)
		: runtime.options.prompts;
}

function promptFactory(method: Method): (log: Log) => void {
	const styles = getStyle(method);

	return (log) => {
		const prompt = create("div", {
			class: "nl-prompt",
			style: { "--bg": styles.bg, "--br": styles.br },
		});

		const content = create("div", { class: "nl-content", parent: prompt });

		for (const arg of log.args) {
			render(arg, content);
		}

		if (log.args.length === 0) {
			render(undefined, content);
		}

		const dismiss = create("div", {
			class: "nl-dismiss",
			content: "+",
			parent: prompt,
		});

		dismiss.addEventListener("click", () => {
			prompt.remove();
		});

		const fade = () => {
			if (prompt.matches(":hover")) {
				setTimeout(fade, runtime.options.timeout * 1000);

				return;
			}

			prompt.remove();
		};
		setTimeout(fade, runtime.options.timeout * 1000);

		if (runtime.root.children.length === runtime.options.maximum) {
			runtime.root.firstChild?.remove();
		}

		runtime.root.appendChild(prompt);
	};
}
