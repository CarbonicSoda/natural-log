export namespace CssUtils {
	export function instant(element: HTMLElement, className: string): void {
		requestAnimationFrame(() =>
			requestAnimationFrame(() => element.classList.add(className)),
		);
	}
}
