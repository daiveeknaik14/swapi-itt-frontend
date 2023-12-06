/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2986cc",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
