/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#ebfffb',
          100: '#c6fff4',
          200: '#90ffe9',
          300: '#58f2da',
          400: '#2ed0c0',
          500: '#12a9a6',
          600: '#0e8283',
          700: '#0a6264',
          800: '#094f52',
          900: '#073d40'
        },
        accent: {
          50:  '#eaf5ff',
          100: '#cfe7ff',
          200: '#a0ceff',
          300: '#72b6ff',
          400: '#3f99ff',
          500: '#167dff',
          600: '#0f60cc',
          700: '#0b4899',
          800: '#073166',
          900: '#041a33'
        }
      }
    },
  },
  plugins: [],
};