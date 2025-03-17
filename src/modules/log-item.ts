import { ConsoleMethod } from "../types/types";

export class LogItem {
	constructor(
		public method: ConsoleMethod,
		public time: string,
		public items: any[] | any,
	) {
		if (this.items.length === 1) this.items = this.items[0];
	}

	toString(details: { index?: number; sep: "newline" | "space" }): string {
		const strItems = [this.items].flat().map((item) => {
			if (typeof item !== "object") return `${item}`;
			try {
				return JSON.stringify(item, null, " ");
			} catch {
				return details.index
					? `[Circular], refer to natlog.history[${details.index}].`
					: "[Circular], inspect in debug console or enable history.";
			}
		});
		const sep = details.sep === "newline" ? "<br>" : " ";
		return strItems.join(sep);
	}
}
