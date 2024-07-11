/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary:'#1a202c',
        accent:'#2b6cb0',
        neutral:'#ffffff',
        secondaryNeutral:'#edf2f7',
        accent1:'#0b6cb0'
      },
      transitionDuration: {
        '400':'4000ms'
      }
    },
  },
  plugins: [],
}

