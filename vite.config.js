/** @type {import('vite').UserConfig} */
import StringReplace from "vite-plugin-string-replace";

export default {
  plugins: [
    StringReplace([
      {
        fileName: "index.html",
        search: /href="\/assets\//g, // search this string in content
        replace: 'href="en-us/images/assets/', // replace search string with this
      },
      {
        fileName: "index.html",
        search: /src="\/assets\//g, // you can use RegEXP to search in content
        replace: 'src="en-us/images/assets/', // replace search string with this
      },
    ]),
  ],
};
