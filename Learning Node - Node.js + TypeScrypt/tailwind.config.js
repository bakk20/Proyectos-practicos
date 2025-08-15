/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"  
  ],
  theme: {
    extend: {
            ringWidth: {
        3: '3px',
        5: '5px',
        6: '6px',
      },
      spacing: {
        6: '1.5rem', // 24px
        7: '1.75rem',
        8: '2rem',
      }
    },
  },
  plugins: [],
}

