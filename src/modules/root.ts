export class Root extends HTMLElement {}

export function root(): HTMLElement {
	customElements.define("nat-log", Root);

	const root = document.createElement("nat-log");
	document.body.appendChild(root);

	return root;
}
