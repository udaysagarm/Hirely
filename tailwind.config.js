/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // this line is critical
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1', // Indigo 500
          600: '#4f46e5', // Indigo 600
          700: '#4338ca', // Indigo 700
        },
        secondary: {
          500: '#8b5cf6', // Violet 500
        }
      }
    },
  },
  plugins: [],
}

