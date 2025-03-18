export namespace DomUtils {
	//MO DOC inject css styles into page
	export function injectStyles(styles: string): void {
		document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
	}

	//MO DOC shortcut method for DOM element creation/config
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

	//MO DOC instantly add class after a frame to trigger transition
	export function instantApply(element: HTMLElement, className: string): void {
		requestAnimationFrame(() =>
			requestAnimationFrame(() => element.classList.add(className)),
		);
	}

	//MO DOC check for text selection state
	export function isTextSelected(element: HTMLElement): boolean {
		const selection = window.getSelection();
		return (
			!!selection &&
			selection.focusOffset - selection.anchorOffset !== 0 &&
			selection.containsNode(element, true)
		);
	}
}
