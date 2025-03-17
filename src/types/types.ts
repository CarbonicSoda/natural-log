//MO REGISTRATION Registration location 1.
export const popupMethods = ["log", "warn", "error"] as const;

export type ConsoleMethod = keyof Console;
export type PopupMethod = (typeof popupMethods)[number];

export interface NatlogOptions {
	console: boolean | ConsoleMethod[];
	popup: boolean | PopupMethod[];
	maxPopupCount: number;
	popupTimeout: number;
	popupSep: "newline" | "space";
	history: boolean;
	timeOptions: Intl.DateTimeFormatOptions;
}
