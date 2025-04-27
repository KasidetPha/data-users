/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // extend: {},
    screens: {
    sm : '650px',
    md: '700px',
    lg: '1204px',
    xl: '1280px',
    '2xl': '1536px'}
  },
  plugins: [],
}

