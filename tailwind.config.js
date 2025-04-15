/* tailwind.config.js */

module.exports = {
  /* Enable Tailwind’s “class” strategy for dark mode */
  darkMode: "class",

  /* Tell Tailwind which files to scan for class names */
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // All source files
    "./pages/**/*.{js,ts,jsx,tsx}", // Next.js page files
    "./components/**/*.{js,ts,jsx,tsx}", // Re‑usable components
  ],

  /* Extend or override the default theme here */
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"], // Custom sans‑serif stack
      },
      colors: {
        /* Example custom brand colors */
        brand: {
          50: "#f5f9ff",
          100: "#e0eaff",
          200: "#bdd5ff",
          300: "#8ab8ff",
          400: "#579aff",
          500: "#2d7dff", // Primary brand color
          600: "#0f63e6",
          700: "#0c4bb4",
          800: "#083582",
          900: "#042051",
        },
      },
      transitionProperty: {
        /* Smooth color / background transitions */
        "colors-bg": "background-color, color",
      },
    },
  },

  /* Add any Tailwind plugins you need */
  plugins: [
    // require("@tailwindcss/forms"), // Better default form styles
    // require("@tailwindcss/typography"), // Prose styling for rich text
  ],
};
