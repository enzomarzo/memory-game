import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import replace from "@rollup/plugin-replace";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
