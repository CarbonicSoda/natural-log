import { Natlog } from "..";

//MO DOC exposed natlog object declaration
declare global {
	interface Window {
		natlog: typeof Natlog;
	}
}
