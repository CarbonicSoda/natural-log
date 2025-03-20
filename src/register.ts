import { register } from "./registry/registry";

//MO DOC insert registered method name
export const POPUP_METHODS = ["log", "warn", "error", "debug"] as const;

//MO DOC define method styles (background, foreground, border) and an optional args transform method
register("log", {
	styles: {
		bg: "oklch(0.97 0 0)",
		fg: "oklch(0.145 0 0)",
		br: "oklch(0.708 0 0)",
	},
});
register("warn", {
	styles: {
		bg: "oklch(0.973 0.071 103.193)",
		fg: "oklch(0.286 0.066 53.813)",
		br: "oklch(0.852 0.199 91.936)",
	},
});
register("error", {
	styles: {
		bg: "oklch(0.936 0.032 17.717)",
		fg: "oklch(0.258 0.092 26.042)",
		br: "oklch(0.704 0.191 22.216)",
	},
});
register("debug", {
	styles: {
		bg: "oklch(0.932 0.032 255.585)",
		fg: "oklch(0.282 0.091 267.935)",
		br: "oklch(0.707 0.165 254.624)",
	},
});
