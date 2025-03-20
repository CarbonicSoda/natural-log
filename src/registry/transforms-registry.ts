import { ConsoleMethod } from "../types/types";

//MO DOC registry for method args transformations
export namespace TransformsRegistry {
	export type ArgsTransformer = (args: any) => Array<any>;

	const TRANSFORM_REGISTRY: Map<ConsoleMethod, ArgsTransformer> = new Map();
	const FALLBACK_TRANSFORM: ArgsTransformer = (args) => args;

	export function register(
		method: ConsoleMethod,
		transform: ArgsTransformer = FALLBACK_TRANSFORM,
	): void {
		TRANSFORM_REGISTRY.set(method, transform);
	}
	export function get(method: ConsoleMethod): ArgsTransformer {
		return TRANSFORM_REGISTRY.get(method) ?? FALLBACK_TRANSFORM;
	}
}
