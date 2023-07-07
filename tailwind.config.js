/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./src/**/*.{js,ts,jsx,tsx}",
    ".src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"red"
      }
    },
  },
  plugins: [],
}

