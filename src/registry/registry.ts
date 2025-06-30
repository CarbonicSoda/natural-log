import { Method } from "../types/method";

export interface Style {
	bg: string;
	br: string;
}

const registry = new Map<Method, Style>();

export function regStyle(method: Method, style: Style): void {
	registry.set(method, style);
}

export function getStyle(method: Method): Style {
	return registry.get(method) ?? { bg: "#000", br: "#000" };
}
