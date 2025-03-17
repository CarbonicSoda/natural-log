export namespace DomUtils {
	export function injectStyles(styles: string): void {
		document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
	}

	export function createAppend<T extends keyof HTMLElementTagNameMap>(
		tag: T,
		options?: {
			parent?: HTMLElement;
			class?: string | string[];
			styles?: { [property: string]: any };
			html?: string;
		},
	): HTMLElementTagNameMap[T] {
		const element = document.createElement(tag);
		options?.parent?.appendChild(element);

		if (options?.class) {
			if (typeof options.class === "string") element.className = options.class;
			else element.classList.add(...options.class);
		}
		if (options?.styles) {
			for (const [property, value] of Object.entries(options.styles)) {
				element.style.setProperty(property, `${value}`);
			}
		}
		if (options?.html) element.innerHTML = options.html;

		return element;
	}
}
