/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5271ff',
        primaryDark: '#938eef',
        'light-bg': '#fff',
        'light-bgSoft': '#f6f3f3',
        'light-text': '#000',
        'light-textSoft': '#555',
        'light-border': 'lightgray',
        'light-logo': 'darkblue',
        'dark-bg': '#222',
        'dark-bgSoft': '#333',
        'dark-text': '#ddd',
        'dark-textSoft': 'lightgray',
        'dark-border': '#444',
        'dark-logo': 'white',
      },
      screens: {
        'mobile': { 'max': '480px' },
        'tablet': { 'max': '960px' },
      },
    },
  },
  plugins: [],
}
