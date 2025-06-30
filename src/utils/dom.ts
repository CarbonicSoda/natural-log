export interface CreateOptions extends ElementCreationOptions {
	class: string;
	style: Record<string, string>;

	content: string | Node;
	parent: Node;
}

export function create<T extends keyof HTMLElementTagNameMap>(
	tag: T,
	options?: Partial<CreateOptions>,
): HTMLElementTagNameMap[T] {
	const ele = document.createElement(tag, options);

	if (options?.class) {
		ele.className = options.class;
	}

	if (options?.style) {
		for (const [prop, value] of Object.entries(options.style)) {
			ele.style.setProperty(prop, value);
		}
	}

	if (options?.content) {
		ele.append(options.content);
	}

	if (options?.parent) {
		options.parent.appendChild(ele);
	}

	return ele;
}

export function stylize(styles: string): void {
	document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
}
