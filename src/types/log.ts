import { Method } from "./method";

export interface Log {
	type: Method;
	time: string;
	args: unknown[];
}
