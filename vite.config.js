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
          src: [
            "main.js",
            "card_title.js",
            "chart_box.js",
            "chart_slider.js",
            "mockdata.js",
          ],
          dest: "./",
        },
      ],
    }),
    StringReplace([
      {
        fileName: "index.html",
        search: /="\/assets\//g, // you can use RegEXP to search in content
        replace: '="assets/', // replace search string with this
      },
      {
        fileName: "index.html",
        search: '<script src="', // you can use RegEXP to search in content
        replace: '<script src="Scripts/', // replace search string with this
      },
      {
        fileName: "index.html",
        search: 'href="/styles.css"', // you can use RegEXP to search in content
        replace: 'href="Content\\styles.css"', // replace search string with this
      },
    ]),
  ],
};
