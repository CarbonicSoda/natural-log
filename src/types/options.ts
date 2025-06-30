import { Method } from "./method";

export interface Options {
	console: boolean | Method[];
	prompts: boolean | Method[];

	history: boolean;

	maximum: "auto" | number;
	timeout: "auto" | number;
}
