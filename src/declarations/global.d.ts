import { Natlog } from "..";

declare global {
	interface Window {
		natlog: typeof Natlog;
	}
}
