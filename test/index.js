import { Natlog } from "natural-log";

new Natlog({
	timeout: 1000,
});
console.log({
	cause: 69,
	details: [null],
});
console.warn("FLAG", false);
console.error(new SyntaxError("Brain Loss"));
console.debug(new TextEncoder().encode("Hello World"));
console.log(console, 1)