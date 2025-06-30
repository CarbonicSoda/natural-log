import deletePlugin from "rollup-plugin-delete";

import resolvePlugin from "@rollup/plugin-node-resolve";
import terserPlugin from "@rollup/plugin-terser";
import dtsPlugin from "rollup-plugin-dts";
import cssPlugin from "rollup-plugin-import-css";
import ts2Plugin from "rollup-plugin-typescript2";

import { transform } from "lightningcss";

export default [
	{
		input: "src/index.ts",
		output: { file: "dist/index.esm.js", format: "esm" },

		plugins: [
			deletePlugin({ targets: "dist", runOnce: true }),

			ts2Plugin({ useTsconfigDeclarationDir: true }),
			resolvePlugin(),
			cssPlugin({ transform: minifyCss }),

			terserPlugin(),
		],

		watch: true,
	},
	{
		input: "src/index.ts",
		output: { file: "dist/index.js", format: "cjs" },

		plugins: [
			ts2Plugin({ useTsconfigDeclarationDir: true }),
			resolvePlugin(),
			cssPlugin({ transform: minifyCss }),

			terserPlugin(),
		],

		watch: false,
	},
	{
		input: "dist/types/index.d.ts",
		output: [{ file: "dist/index.d.ts", format: "es" }],

		plugins: [dtsPlugin()],

		watch: true,
	},
];

function minifyCss(raw) {
	return transform({ code: Buffer.from(raw), minify: true }).code.toString();
}
