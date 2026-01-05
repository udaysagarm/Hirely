/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // this line is critical
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}

