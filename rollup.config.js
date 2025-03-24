import terser from "@rollup/plugin-terser";
import deleter from "rollup-plugin-delete";
import dts from "rollup-plugin-dts";
import importcss from "rollup-plugin-import-css";
import typescript2 from "rollup-plugin-typescript2";

export default [
	{
		input: "src/index.ts",
		output: {
			file: "dist/index.esm.js",
			format: "esm",
		},
		plugins: [
			deleter({ targets: "dist/" }),
			importcss({
				minify: true,
			}),
			typescript2({
				useTsconfigDeclarationDir: true,
			}),
			terser(),
		],
	},
	{
		input: "src/index.ts",
		output: {
			file: "dist/index.js",
			format: "cjs",
		},
		watch: false,
		plugins: [
			importcss({
				minify: true,
			}),
			typescript2({
				useTsconfigDeclarationDir: true,
			}),
			terser(),
		],
	},
	{
		input: "dist/types/index.d.ts",
		output: [{ file: "dist/index.d.ts", format: "es" }],
		plugins: [dts()],
	},
];
