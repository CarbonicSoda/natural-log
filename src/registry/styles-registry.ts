import { ConsoleMethod } from "../types/types";

//MO DOC registry for popup styles
export namespace StylesRegistry {
	export type StyleOptions = {
		bg: string;
		fg: string;
		br: string;
	};

	const STYLES_REGISTRY: Map<ConsoleMethod, StyleOptions> = new Map();
	const FALLBACK_STYLES: StyleOptions = {
		bg: "#000",
		fg: "#000",
		br: "#000",
	};

	export function register(
		method: ConsoleMethod,
		style: StyleOptions = FALLBACK_STYLES,
	): void {
		STYLES_REGISTRY.set(method, style);
	}
	export function get(method: ConsoleMethod): StyleOptions {
		return STYLES_REGISTRY.get(method) ?? FALLBACK_STYLES;
	}
}
