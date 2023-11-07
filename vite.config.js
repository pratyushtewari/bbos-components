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
        search: /="\/assets\//g, // you can use RegEXP to search in content
        replace: '="assets/', // replace search string with this
      },

      {
        fileName: "index.html",
        search: '<script src="mockdata.js"></script>', // you can use RegEXP to search in content
        replace: '<script src="Scripts/mockdata.js"></script>', // replace search string with this
      },
      {
        fileName: "index.html",
        search: '<script src="main.js"></script>', // you can use RegEXP to search in content
        replace: '<script src="Scripts/main.js"></script>', // replace search string with this
      },
    ]),
  ],
};
