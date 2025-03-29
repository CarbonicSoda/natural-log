export namespace DomUtils {
	//MO DOC create natlog root with styles
	export function createRoot(styles?: string): HTMLElement {
		customElements.define(
			"natlog-root",
			class NatlogRoot extends HTMLElement {
				constructor() {
					super();
				}
			},
		);
		const root = document.createElement("natlog-root");
		document.body.appendChild(root);

		if (styles) {
			document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
		}

		return root;
	}

	//MO DOC shortcut method for DOM element creation/config
	export function createAppend<T extends keyof HTMLElementTagNameMap>(
		tag: T,
		options?: {
			parent?: HTMLElement;
			class?: string | string[];
			styles?: { [property: string]: any };
			text?: string;
			wrap?: HTMLElement;
		},
	): HTMLElementTagNameMap[T] {
		const element = document.createElement(tag);

		if (options?.class) {
			if (typeof options.class === "string") element.className = options.class;
			else element.classList.add(...options.class);
		}
		if (options?.styles) {
			for (const [property, value] of Object.entries(options.styles)) {
				element.style.setProperty(property, `${value}`);
			}
		}
		if (options?.text) element.innerText = options.text;
		if (options?.wrap) element.appendChild(options.wrap);

		options?.parent?.appendChild(element);

		return element;
	}
}
