import { ConsoleMethod } from "../types/types";

import { TransformsRegistry } from "./transforms-registry";
import { StylesRegistry } from "./styles-registry";

//MO DOC shortcut for registries
export function register(
	method: ConsoleMethod,
	options?: {
		transform?: TransformsRegistry.ArgsTransformer;
		styles?: StylesRegistry.StyleOptions;
	},
): void {
	TransformsRegistry.register(method, options?.transform);
	StylesRegistry.register(method, options?.styles);
}
