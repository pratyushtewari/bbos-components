/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        brand: "#0055A5",
        // Voilet-600
        "focus-outline": "#7c3aed",
        // slate-950
        "text-primary": "#020617",
        // slate-500
        "text-secondary": "#64748b",
        // slate-400
        "text-tertiary": "#94a3b8",
        // slate-200
        "text-disabled": "#e2e8f0",
        // green-700
        success: "#15803d",
        // yellow-700
        warn: "#a16207",
        // blue-700
        info: "#1d4ed8",
        // red-700
        error: "#b91c1c",
      },
      boxShadow: {
        "selected-horizontal": "inset 0 -2px 0 #0055A5",
      },
    },
  },
  plugins: [],
};
