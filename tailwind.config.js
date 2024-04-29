/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      poppins: ['Poppins'],
      montserrat: ['Montserrat'],
    },
    colors: {
      primary: {
        text: '#E4FAFB',
        innertext: '#FFFFFF',
        partial: '#B89737',
        correct: '#418243',
        incorrect: '#29282B',
      },
    },
  },
  plugins: [],
}
