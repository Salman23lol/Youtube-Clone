/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xms': '300px',
        'sm': '480px',
        'md': '786px',
        'lg': '992px',
        'xl': '1240px',
        '2xl': '1480px',
      },
    },
  },
  plugins: [],
};
