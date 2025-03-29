import { register } from "./registry/registry";
import { ConsoleMethod } from "./types/types";

//MO DOC insert registered method name
export const POPUP_METHODS = [
	"log",
	"warn",
	"error",
	"debug",
] as const satisfies ConsoleMethod[];

//MO DOC define method styles (background and border colors) and an optional args transform method
register("log", {
	styles: {
		bg: "oklch(0.985 0 0)",
		br: "oklch(0.87 0 0)",
	},
});

register("warn", {
	styles: {
		bg: "oklch(0.987 0.026 102.212)",
		br: "oklch(0.905 0.182 98.111)",
	},
});

register("error", {
	styles: {
		bg: "oklch(0.971 0.013 17.38)",
		br: "oklch(0.704 0.191 22.216)",
	},
});

register("debug", {
	styles: {
		bg: "oklch(0.97 0.014 254.604)",
		br: "oklch(0.809 0.105 251.813)",
	},
});
