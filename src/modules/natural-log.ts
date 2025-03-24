import styles from "../styles/styles.css";

import { DomUtils } from "../utils/dom";

import { ConsoleMethod, NatlogOptions, PopupMethod } from "../types/types";

import "../register";
import { POPUP_METHODS } from "../register";
import { TransformsRegistry } from "../registry/transforms-registry";
import { StylesRegistry } from "../registry/styles-registry";

import { LogItem } from "./log-item";

export class Natlog {
	//MO DOC expose native console (after configured mute) and console history
	static console: Console;
	static history: LogItem[] = [];

	//MO DOC expose current timestamp in the same format as history
	static get now(): string {
		return new Date().toLocaleTimeString(undefined, {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			fractionalSecondDigits: 3,
		});
	}

	//MO DOC fallback default options and config options
	static readonly #DEFAULT_OPTIONS: NatlogOptions = {
		console: true,
		popup: true,
		maxPopup: 5,
		timeout: 20,
		history: true,
	} as const;
	static #options: NatlogOptions;

	//MO DOC shadow root that popups will reside
	static #popupRoot: ShadowRoot;

	//MO DOC enablement state checkers
	static #isConsoleOn(method: ConsoleMethod): boolean {
		return typeof this.#options.console === "boolean"
			? this.#options.console === true
			: this.#options.console.includes(method);
	}
	static #isPopupOn(method: ConsoleMethod): boolean {
		return typeof this.#options.popup === "boolean"
			? this.#options.popup === true &&
					POPUP_METHODS.includes(method as PopupMethod)
			: this.#options.popup.includes(method as PopupMethod);
	}
	static get #isHistoryOn(): boolean {
		return this.#options.history;
	}

	constructor(options: Partial<NatlogOptions> = {}) {
		Natlog.#options = { ...Natlog.#DEFAULT_OPTIONS, ...options };

		//MO DOC expose natlog to console
		window.natlog = Natlog;

		//MO DOC create shadow dom
		if (
			typeof Natlog.#options.popup === "boolean"
				? Natlog.#options.popup
				: Natlog.#options.popup.length !== 0
		) {
			//MO DOC inject natlog css styles
			//MO TODO write a more lightweight version
			DomUtils.loadFont("JetBrains Mono:300");
			Natlog.#popupRoot = DomUtils.createShadowDom(styles);
		} else {
			Natlog.#popupRoot = DomUtils.createShadowDom();
		}

		//MO DOC mute excluded console methods
		for (const consoleMethod of Object.keys(console)) {
			const method = consoleMethod as ConsoleMethod;
			if (!Natlog.#isConsoleOn(method)) console[method] = () => void 0;
		}

		//MO DOC hijack console
		Natlog.console = console;
		console = {} as Console;

		//MO DOC wrap natlog methods in history logger and override native console
		for (const consoleMethod of Object.keys(Natlog.console)) {
			const method = consoleMethod as ConsoleMethod;
			console[method] = (...args: any) => {
				const transformed = TransformsRegistry.get(method)(args);
				const logItem = new LogItem(method, Natlog.now, transformed);
				if (Natlog.#isHistoryOn) Natlog.history.push(logItem);

				if (Natlog.#isPopupOn(method)) {
					Natlog.#methodFactory(method)(logItem);
					return;
				}
				(Natlog.console[method] as (...args: any) => any)(...args);
			};
		}
	}

	//MO DOC popup method factory
	static #methodFactory(method: ConsoleMethod): (logItem: LogItem) => any {
		return (logItem: LogItem) => {
			const args = logItem.argsArray;

			(this.console[method] as (...args: any) => any)(...args);
			if (!this.#isPopupOn(method)) return;

			const styles = StylesRegistry.get(method);
			const popup = DomUtils.createAppend("div", {
				class: "popup",
				styles: {
					"--bg": styles.bg,
					"--fg": styles.fg,
					"--br": styles.br,
				},
			});
			//MO TODO abandon support for `html` for createAppend once omnires is completed
			DomUtils.createAppend("p", {
				parent: popup,
				class: "content",
				html: logItem.toString({
					index: this.#isHistoryOn ? this.history.length - 1 : undefined,
				}),
			});
			const dismisser = DomUtils.createAppend("div", {
				parent: popup,
				class: "action",
				html: "+",
			});

			this.#popupRoot.appendChild(popup);
			if (this.#popupRoot.childNodes.length > this.#options.maxPopup) {
				this.#popupRoot.removeChild(this.#popupRoot.childNodes[0]);
			}
			popup.classList.add("show");

			const dispose = () => {
				clearTimeout(timeout);
				popup.ontransitionend = popup.remove;
				popup.classList.remove("show");
			};
			const timeout = setTimeout(dispose, this.#options.timeout * 1000);
			dismisser.onclick = dispose;
		};
	}
}
