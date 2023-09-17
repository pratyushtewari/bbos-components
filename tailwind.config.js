/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        "primary-brand": "#0055A5",
      },
      boxShadow: {
        "selected-horizontal": "inset 0 -2px 0 #0055A5",
      },
    },
  },
  plugins: [],
};

