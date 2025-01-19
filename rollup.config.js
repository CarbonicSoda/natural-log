import del from "rollup-plugin-delete";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";
// import { dts } from "rollup-plugin-dts";

export default [
	{
		input: "src/index.ts",
		output: {
			file: "dist/index.esm.js",
			format: "esm",
		},
		plugins: [
			del({ targets: "dist/" }),
			typescript({
				useTsconfigDeclarationDir: true,
			}),
			terser({
				compress: {
					unsafe: true,
				},
			}),
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
			typescript({
				useTsconfigDeclarationDir: true,
			}),
			terser({
				compress: {
					unsafe: true,
				},
			}),
		],
	},
];
