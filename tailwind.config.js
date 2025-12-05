/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf7f5',
          100: '#f5ede8',
          200: '#E2C1AC', // Base color
          300: '#d4b09a',
          400: '#c69f88',
          500: '#b88e76',
          600: '#a87d64',
          700: '#8f6b55',
          800: '#765946',
          900: '#5d4737',
        },
        beige: {
          50: '#faf7f5',
          100: '#f5ede8',
          200: '#E2C1AC', // Base color (RGB: 226,193,172)
          300: '#d4b09a',
          400: '#c69f88',
          500: '#b88e76',
          600: '#a87d64',
          700: '#8f6b55',
          800: '#765946',
          900: '#5d4737',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}

