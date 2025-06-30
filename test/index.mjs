import { natlog } from "natural-log";

natlog({ timeout: 9999 });
console.log({ cause: 69, details: [null] });
console.warn("FLAG", false);
console.error(new SyntaxError("Brain Loss"));
console.debug(new TextEncoder().encode("Hello World"));
console.log(console, 1);
