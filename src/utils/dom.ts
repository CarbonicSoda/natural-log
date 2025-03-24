import { default as WebFont } from "webfontloader";

export namespace DomUtils {
	//MO DOC create shadow dom with styles
	export function createShadowDom(styles?: string): ShadowRoot {
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

		const shadowRoot = root.attachShadow({ mode: "closed" });
		shadowRoot.innerHTML = styles ? `<style>${styles}</style>` : "";

		return shadowRoot;
	}

	//MO DOC load font into dom
	export function loadFont(family: string): void {
		WebFont.load({
			google: {
				families: [family],
			},
		});
	}

	//MO DOC shortcut method for DOM element creation/config
	export function createAppend<T extends keyof HTMLElementTagNameMap>(
		tag: T,
		options?: {
			parent?: HTMLElement | ShadowRoot;
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
