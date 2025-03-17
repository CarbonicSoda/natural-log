import { StylesRegistry } from "./registry";

//MO REGISTRATION Registration location 3.
StylesRegistry.register("log", {
	bg: "oklch(0.97 0 0)",
	fg: "oklch(0.145 0 0)",
	br: "oklch(0.708 0 0)",
});
StylesRegistry.register("warn", {
	bg: "oklch(0.973 0.071 103.193)",
	fg: "oklch(0.286 0.066 53.813)",
	br: "oklch(0.852 0.199 91.936)",
});
StylesRegistry.register("error", {
	bg: "oklch(0.936 0.032 17.717)",
	fg: "oklch(0.258 0.092 26.042)",
	br: "oklch(0.704 0.191 22.216)",
});
