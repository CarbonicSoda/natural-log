export class LogItem {
	time: string;
	index?: number;

	constructor(public type: "log" | "warn" | "error", public items: any[]) {
		this.time = new Date(Date.now()).toLocaleString();
	}

	reg(stack: LogItem[]): number {
		return (this.index = stack.push(this) - 1);
	}

	toString(): string {
		const itemsAsString = this.items.map((item) => {
			if (typeof item !== "object") return String(item);
			try {
				return JSON.stringify(item);
			} catch {
				return `Contains circular structure, refer to natlog.stack[${this.index}] in debug console.`;
			}
		});
		return itemsAsString.join("\n");
	}
}
