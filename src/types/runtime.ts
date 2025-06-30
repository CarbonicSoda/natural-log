import { Log } from "./log";
import { Options } from "./options";

export interface Runtime {
	options: Options;

	console: Console;
	history: Log[];
	now: () => string;

	root: HTMLElement;
}
