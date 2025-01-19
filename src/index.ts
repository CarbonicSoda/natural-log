import { LogItem } from "./log-item";
import { injectStyleCSS } from "./style";

export namespace natlog {
	export const stack: LogItem[] = [];

	export function log(...items: any[]): void {
		console.log(...items);

		const logItem = new LogItem("log", items);
		logItem.reg(stack);

		const logBanner = document.createElement("div");
		logBanner.className = "natlog-log";

		const content = document.createElement("p");
		content.className = "natlog-content";
		content.textContent = logItem.toString();

		logBanner.appendChild(content);
		promptArea.appendChild(logBanner);
		if (promptArea.childNodes.length > 6) promptArea.removeChild(promptArea.childNodes[0]);
		requestAnimationFrame(() => requestAnimationFrame(() => logBanner.classList.add("show")));

		const dispose = () => {
			clearTimeout(timeout);
			logBanner.ontransitionend = logBanner.remove;
			logBanner.classList.remove("show");
		};
		const timeout = setTimeout(dispose, 10000);
		logBanner.onclick = dispose;
	}

	// export function warn(...items: any[]): void {
	// 	console.warn(...items);
	// 	stackLogItem("warn", items);
	// }

	// export function error(...items: any[]): void {
	// 	console.error(...items);
	// 	stackLogItem("error", items);
	// }
}

//#region init
Object.defineProperty(window, "natlog", {
	value: natlog,
});

const injectStyle = document.createElement("style");
injectStyle.textContent = injectStyleCSS;
document.head.appendChild(injectStyle);

const promptArea = document.createElement("div");
promptArea.className = "natlog-injected";
document.body.appendChild(promptArea);

//#endregion init
