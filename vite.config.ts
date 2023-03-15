import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    // This is needed to run PEXELS with Vite (https://github.com/pexels/pexels-javascript/issues/31)
    replace({
      preventAssignment: true,
      "process.env.API_KEY": {},
      'require("isomorphic-fetch");': 'import "isomorphic-fetch";',
    }),
  ],
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
