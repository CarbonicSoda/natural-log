import { ConsoleMethod } from "../types/types";

export namespace StylesRegistry {
	export type ColorVars = {
		bg: string;
		fg: string;
		br: string;
	};

	const colorStylesRegistry: Map<ConsoleMethod, ColorVars> = new Map();
	const fallbackColorStyles = {
		bg: "#000",
		fg: "#000",
		br: "#000",
	};

	export function register(method: ConsoleMethod, colors: ColorVars): void {
		colorStylesRegistry.set(method, colors);
	}
	export function get(method: ConsoleMethod): ColorVars {
		return colorStylesRegistry.get(method) ?? fallbackColorStyles;
	}
}
