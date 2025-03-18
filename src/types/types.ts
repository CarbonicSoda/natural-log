//MO REGISTRATION registration step 1, declare method
// Step 2 in modules/natural-log.ts
// Step 3 in styles/register.ts
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
