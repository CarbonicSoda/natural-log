import styles from "../styles/styles.css";
import { StylesRegistry } from "../styles/registry";
import "../styles/register";

import { DomUtils } from "../utils/dom";
import { TimeUtils } from "../utils/time";

import {
	ConsoleMethod,
	NatlogOptions,
	PopupMethod,
	popupMethods,
} from "../types/types";

import { LogItem } from "./log-item";

export class Natlog {
	//MO REGISTRATION Registration location 2.
	log(...items: any): void {
		Natlog.#methodFactory("log")(items);
	}
	warn(...items: any): void {
		Natlog.#methodFactory("warn")(items);
	}
	error(...items: any): void {
		Natlog.#methodFactory("error")(items);
	}

	static optionDefaults: NatlogOptions = {
		console: true,
		popup: true,
		maxPopupCount: 5,
		popupTimeout: 30,
		popupSep: "newline",
		history: true,
		timeOptions: {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			fractionalSecondDigits: 3,
		},
	};

	static options: NatlogOptions;
	static history: LogItem[] = [];

	static $console: Console;
	static $popupDiv: HTMLDivElement;

	static get now(): string {
		return TimeUtils.now(Natlog.options.timeOptions);
	}

	static isConsoleOn(method: ConsoleMethod): boolean {
		return typeof this.options.console === "boolean"
			? this.options.console === true
			: this.options.console.includes(method);
	}
	static isPopupOn(method: ConsoleMethod): boolean {
		return typeof this.options.popup === "boolean"
			? this.options.popup === true &&
					popupMethods.includes(method as PopupMethod)
			: this.options.popup.includes(method as PopupMethod);
	}
	static get isHistoryOn(): boolean {
		return this.options.history;
	}

	//MO DOC Singleton, only one instance should be constructed
	constructor(options: Partial<NatlogOptions> = {}) {
		Natlog.options = { ...Natlog.optionDefaults, ...options };

		window.natlog = Natlog;
		if (Natlog.options.popup !== false) {
			DomUtils.injectStyles(styles);
			Natlog.$popupDiv = DomUtils.createAppend("div", {
				parent: document.body,
				class: "natlog-injected",
			});
		}

		for (const _method of Object.keys(console)) {
			const method = _method as ConsoleMethod;
			if (!Natlog.isConsoleOn(method)) console[method] = () => void 0;
		}

		Natlog.$console = console;
		console = {} as Console;
		for (const _method of Object.keys(Natlog.$console)) {
			const method = _method as ConsoleMethod;
			const overrideMethod = method in this && Natlog.isPopupOn(method);
			console[method] = overrideMethod
				? (this[<keyof typeof this>method] as (...args: any) => any)
				: Natlog.$console[method];
		}
	}

	static #methodFactory(method: ConsoleMethod): (args: any) => any {
		return (args: any) => {
			(this.$console[method] as (...args: any) => any)(...args);

			const logItem = new LogItem(method, this.now, args);
			if (this.isHistoryOn) this.history.push(logItem);

			if (!this.isPopupOn(method)) return;

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
					index: this.isHistoryOn ? this.history.length - 1 : undefined,
					sep: this.options.popupSep,
				}),
			});

			this.$popupDiv.appendChild(popup);
			if (this.$popupDiv.childNodes.length > this.options.maxPopupCount) {
				this.$popupDiv.removeChild(this.$popupDiv.childNodes[0]);
			}
			DomUtils.instantApply(popup, "show");

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
