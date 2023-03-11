/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: "dark-theme",
  theme: {
    extend: {},
    colors: {
      primary: "var(--color-primary)",
      accent: "var(--color-accent)",
      warn: "var(--color-warn)",
    }
  },
  plugins: [],
}
