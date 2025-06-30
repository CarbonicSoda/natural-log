import { Method } from "./method";

export interface Options {
	console: boolean | Method[];
	prompts: boolean | Method[];

	history: boolean;

	timeout: number;
	maximum: number;
}
