import { POPUP_METHODS } from "../register";

export type ConsoleMethod = keyof Console;
export type PopupMethod = (typeof POPUP_METHODS)[number];

export interface NatlogOptions {
	console: boolean | ConsoleMethod[];
	popup: boolean | PopupMethod[];
	maxPopup: number | "auto";
	timeout: number;
	history: boolean;
}
