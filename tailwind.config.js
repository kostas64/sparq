const colors = require("./assets/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        black: ["Black"],
        blackO: ["BlackO"],
        book: ["Book"],
        bookO: ["BookO"],
        heavy: ["Heavy"],
        heavyO: ["HeavyO"],
        lightO: ["LightO"],
        medium: ["Medium"],
        mediumO: ["MediumO"],
        oblique: ["Oblique"],
        roman: ["Roman"],
      },
      colors,
    },
  },
  plugins: [],
};
