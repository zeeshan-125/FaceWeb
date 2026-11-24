/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Montserrat"', '"DM Sans"', 'sans-serif'],
        display: ['"Montserrat"', 'sans-serif'],
        heading: ['"Montserrat"', 'sans-serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
        card: ['"Montserrat"', 'sans-serif'],
        outfit: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        brand: {
          blue:  '#2B5BA8',
          blue2: '#1e4690',
          blue3: '#3a6fc4',
          green:  '#3AAA35',
          green2: '#2d8a29',
          green3: '#4ec448',
          slate:  '#1e2d45',
        },
      },
    },
  },
  plugins: [],
}
