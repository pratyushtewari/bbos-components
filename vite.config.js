/** @type {import('vite').UserConfig} */
import StringReplace from "vite-plugin-string-replace";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default {
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == "index.css") return "styles.css";
          return assetInfo.name;
        },
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "main.js",
          dest: "./",
        },
      ],
    }),
    StringReplace([
      {
        fileName: "index.html",
        search: /src="\/assets\//g, // you can use RegEXP to search in content
        replace: 'src="assets/', // replace search string with this
      },
    ]),
  ],
};
