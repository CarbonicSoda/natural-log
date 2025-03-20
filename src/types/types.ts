import { POPUP_METHODS } from "../register";

export type ConsoleMethod = keyof Console;
export type PopupMethod = (typeof POPUP_METHODS)[number];

export interface NatlogOptions {
	console: boolean | ConsoleMethod[];
	popup: boolean | PopupMethod[];
	maxPopupCount: number;
	popupTimeout: number;
	popupSep: "newline" | "space";
	history: boolean;
	timeOptions: Intl.DateTimeFormatOptions;
}
