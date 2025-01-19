export const injectStyleCSS = `.natlog-injected {
	all: initial;
	box-sizing: border-box;

	--def-ease: 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);

	position: fixed;
	z-index: 99999;
	right: 6vw;
	bottom: 1vh;
	display: flex;
	flex-direction: column-reverse;

	& .natlog-log {
		--bg-color: #ffffff;
		--fg-color: #000000;
		--border-color: #000000;

		background-color: var(--bg-color);
		border: var(--border-color) 1px solid;
		border-radius: 15px;
		margin: 1.5vh 0;
		padding: 1% 7%;
		width: 30vw;

		cursor: pointer;

		opacity: 0;
		transition: all var(--def-ease);

		&.show {
			opacity: 1;
		}

		& .natlog-content {
			font-size: 1.2rem;
			font-family: monospace;
			word-break: break-all;
			color: var(--fg-color);
		}

		&:hover {
			transform: scale(1.02);
			box-shadow: 0 0 2rem 0.5rem rgba(124, 127, 147, 0.3);
		}
	}
}
`
	.replaceAll(/[\n\t]/g, "")
	.replaceAll(": ", ":")
	.replaceAll(" {", "{");
