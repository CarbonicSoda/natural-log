import "../styles/register";
import { StylesRegistry } from "../styles/registry";
import styles from "../styles/styles.css";

import { DomUtils } from "../utils/dom";

import {
	ConsoleMethod,
	NatlogOptions,
	PopupMethod,
	popupMethods,
} from "../types/types";

import { LogItem } from "./log-item";

export class Natlog {
	// Step 1 in types/types.ts
	//MO REGISTRATION registration step 2, add corresponding methods
	// Step 3 in styles/register.ts
	log(logItem: LogItem): void {
		Natlog.#methodFactory("log")(logItem);
	}
	warn(logItem: LogItem): void {
		Natlog.#methodFactory("warn")(logItem);
	}
	error(logItem: LogItem): void {
		Natlog.#methodFactory("error")(logItem);
	}

	//MO DOC fallback default options
	static #optionDefaults: NatlogOptions = {
		console: true,
		popup: true,
		maxPopupCount: 5,
		popupTimeout: 20,
		popupSep: "newline",
		history: true,
		timeOptions: {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			fractionalSecondDigits: 3,
		},
	};
	//MO DOC div that popups will reside
	static #popupDiv: HTMLDivElement;

	//MO DOC expose natlog options, native console (after configured mute) and console history
	static options: NatlogOptions;
	static console: Console;
	static history: LogItem[] = [];

	//MO DOC expose current timestamp in the same format as history
	static get now(): string {
		return new Date().toLocaleTimeString(undefined, Natlog.options.timeOptions);
	}

	constructor(options: Partial<NatlogOptions> = {}) {
		Natlog.options = { ...Natlog.#optionDefaults, ...options };

		//MO DOC expose natlog to console
		window.natlog = Natlog;

		//MO DOC inject natlog css styles
		if (
			typeof Natlog.options.popup === "boolean"
				? Natlog.options.popup
				: Natlog.options.popup.length !== 0
		) {
			DomUtils.injectStyles(styles);
			Natlog.#popupDiv = DomUtils.createAppend("div", {
				parent: document.body,
				class: "natlog-injected",
			});
		}

		//MO DOC mute excluded console methods
		for (const _method of Object.keys(console)) {
			const method = _method as ConsoleMethod;
			if (!Natlog.#isConsoleOn(method)) console[method] = () => void 0;
		}

		//MO DOC hijack console
		Natlog.console = console;
		console = {} as Console;

		//MO DOC wrap natlog methods in history logger and override native console
		for (const _method of Object.keys(Natlog.console)) {
			const method = _method as ConsoleMethod;
			const overrideMethod = method in this && Natlog.#isPopupOn(method);

			console[method] = (...args: any) => {
				const logItem = new LogItem(method, Natlog.now, args);
				if (Natlog.#isHistoryOn) Natlog.history.push(logItem);

				if (!overrideMethod) {
					(Natlog.console[method] as (...args: any) => any)(...args);
					return;
				}
				(this[<keyof typeof this>method] as (logItem: LogItem) => any)(logItem);
			};
		}
	}

	//MO DOC enablement state getters
	static #isConsoleOn(method: ConsoleMethod): boolean {
		return typeof this.options.console === "boolean"
			? this.options.console === true
			: this.options.console.includes(method);
	}
	static #isPopupOn(method: ConsoleMethod): boolean {
		return typeof this.options.popup === "boolean"
			? this.options.popup === true &&
					popupMethods.includes(method as PopupMethod)
			: this.options.popup.includes(method as PopupMethod);
	}
	static get #isHistoryOn(): boolean {
		return this.options.history;
	}

	//MO DOC popup method factory
	static #methodFactory(method: ConsoleMethod): (logItem: LogItem) => any {
		return (logItem: LogItem) => {
			const args = logItem.$args;

			(this.console[method] as (...args: any) => any)(...args);
			if (!this.#isPopupOn(method)) return;

			const colorVars = StylesRegistry.get(method);
			const popup = DomUtils.createAppend("div", {
				class: "natlog-popup",
				styles: {
					"--bg-color": colorVars.bg,
					"--fg-color": colorVars.fg,
					"--br-color": colorVars.br,
				},
			});
			DomUtils.createAppend("p", {
				parent: popup,
				class: "natlog-content",
				html: logItem.toString({
					index: this.#isHistoryOn ? this.history.length - 1 : undefined,
					sep: this.options.popupSep,
				}),
			});

			this.#popupDiv.appendChild(popup);
			if (this.#popupDiv.childNodes.length > this.options.maxPopupCount) {
				this.#popupDiv.removeChild(this.#popupDiv.childNodes[0]);
			}
			popup.classList.add("show");

			const dispose = () => {
				clearTimeout(timeout);
				popup.ontransitionend = popup.remove;
				popup.classList.remove("show");
			};
			const timeout = setTimeout(dispose, this.options.popupTimeout * 1000);
			popup.onclick = () => {
				if (!DomUtils.isTextSelected(popup)) dispose();
			};
		};
	}
}
