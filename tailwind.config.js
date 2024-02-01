/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  prefix: "tw-",
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      colors: {
        brand: "#0055A5",
        border: colors.slate[300],
        "border-disabled": colors.zinc[300],
        "border-component": colors.slate[300],
        "bg-primary": colors.white,
        "bg-secondary": colors.slate[50],
        "bg-tertiary": colors.slate[100],
        "bg-disabled": colors.zinc[100],
        "bg-component-hover": colors.slate[200],
        "bg-component-active": colors.slate[100],
        "bg-component-selected": colors.violet[100],
        "bg-component-hover-dark": colors.slate[800],
        "bg-component-active-dark": colors.slate[900],
        "bg-component-selected-dark": colors.violet[800],
        "focus-outline": colors.violet[600],
        "text-primary": colors.slate[800],
        "text-primary-dark": colors.slate[200],
        "text-secondary": colors.slate[500],
        "text-secondary-dark": colors.slate[400],
        "text-tertiary": colors.slate[400],
        "text-disabled": colors.zinc[300],
        success: colors.green[700],
        warn: colors.yellow[700],
        info: colors.blue[700],
        error: colors.red[700],
      },
      boxShadow: {
        "selected-horizontal": "inset 0 -2px 0 #1A3D6C",
        "selected-horizontal-dark": "inset 0 -2px 0 #8b5cf6",
        "selected-vertical": "inset 4px 0 0 #1A3D6C",
      },
      // Matching Bootstrap breakpoints
      screens: {
        // => @media (min-width: 640px) { ... }
        sm: "576px",
        // => @media (min-width: 768px) { ... }
        md: "768px",
        // => @media (min-width: 1024px) { ... }
        lg: "992px",
        // => @media (min-width: 1280px) { ... }
        xl: "1200px",
        // => @media (min-width: 1536px) { ... }
        "2xl": "1400px",
        xxl: "1400px",
      },
    },
  },
  plugins: [],
};
