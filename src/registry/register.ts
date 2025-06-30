import { regStyle } from "./registry";

export function register(): void {
	regStyle("log", { bg: "oklch(0.985 0 0)", br: "oklch(0.87 0 0)" });

	regStyle("warn", { bg: "oklch(0.987 0.026 102.212)", br: "oklch(0.905 0.182 98.111)" });

	regStyle("error", { bg: "oklch(0.971 0.013 17.38)", br: "oklch(0.704 0.191 22.216)" });

	regStyle("debug", { bg: "oklch(0.97 0.014 254.604)", br: "oklch(0.809 0.105 251.813)" });
}
