/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  prefix: 'tw-',
  content: ["./index.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        brand: "#0055A5",
        border: colors.slate[300],
        "border-disabled": colors.zinc[300],
        "border-component": colors.slate[400],
        "bg-primary": colors.white,
        "bg-secondary": colors.slate[100],
        "bg-tertiary": colors.slate[200],
        "bg-disabled": colors.zinc[100],
        "bg-component-hover": colors.slate[300],
        "bg-component-active": colors.slate[200],
        "bg-component-selected": colors.violet[100],
        "focus-outline": colors.violet[600],
        "text-primary": colors.slate[950],
        "text-secondary": colors.slate[500],
        "text-tertiary": colors.slate[400],
        "text-disabled": colors.zinc[300],
        success: colors.green[700],
        warn: colors.yellow[700],
        info: colors.blue[700],
        error: colors.red[700],
      },
      boxShadow: {
        "selected-horizontal": "inset 0 -2px 0 #0055A5",
      },
    },
  },
  plugins: [],
};
