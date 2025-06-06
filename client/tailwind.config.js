/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "primary-200" : "#ffbf00",
        "primary-100" : "#ffc929",
        "secondary-200" : "#00b050",
        "secondary-100" : "#0b1a78",
         "forestGreen": '#34532B',
         "freshGreen": '#74B960',
         "softBlush": '#FFF6F4'
      }
    },
  },
  plugins: [],
}

