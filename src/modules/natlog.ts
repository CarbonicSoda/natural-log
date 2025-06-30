import { wrap } from "omnires";
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

		maximum: "auto",
		timeout: "auto",
	},

	console: window.console,
	history: [],
	now,

	root: root(),
};

export function natlog(options?: Partial<Options>): void {
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
			? runtime.options.prompts.length
			: runtime.options.prompts
	) {
		stylize(styles);
	}
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
			class: "natlog-popup",
			style: { "--bg": styles.bg, "--br": styles.br },
		});

		const content = create("div", { parent: prompt, class: "natlog-content-box" });

		for (const arg of log.args) {
			const omni = wrap(arg);

			create("div", { parent: content, content: omni, class: "natlog-content" });
		}

		// const dismisser = DomUtils.createAppend("div", {
		// 	parent: popup,
		// 	class: "natlog-action",
		// 	text: "+",
		// });

		runtime.root.appendChild(prompt);

		// const maxPopup =
		// 	this.#options.maxPopup === "auto"
		// 		? window.matchMedia("(width >= 64rem)").matches
		// 			? 5
		// 			: window.matchMedia("(width >= 48rem)").matches
		// 				? 3
		// 				: 1
		// 		: this.#options.maxPopup;
		// if (this.#root.childNodes.length > maxPopup) {
		// 	this.#root.removeChild(this.#root.childNodes[0]);
		// }
		// const dispose = () => {
		// 	clearTimeout(timeout);
		// 	popup.remove();
		// };
		// dismisser.onclick = dispose;
		// let timeout = setTimeout(dispose, this.#options.timeout * 1000);
		// popup.onmouseenter = () => {
		// 	clearTimeout(timeout);
		// };
		// popup.onmouseleave = () => {
		// 	timeout = setTimeout(dispose, this.#options.timeout * 1000);
		// };
	};
}
