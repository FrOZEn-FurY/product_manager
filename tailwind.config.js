/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './public/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        danabold: ['"Dana-bold"', 'sans-serif'],
        danabolder: ['"Dana-bolder"', 'sans-serif'],
        peydabold: ['"Peyda-bold"', 'sans-serif'],
        peydabolder: ['"Peyda-bolder"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}