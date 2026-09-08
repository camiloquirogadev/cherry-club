/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink:    { DEFAULT: "#ece6ec", dim: "#c3b9c9", faint: "#9a8fa6" },
        cherry: { DEFAULT: "#c8102e", hi: "#ff2d55", lo: "#8b0a1a", wine: "#4a0d1c" },
        night:  { DEFAULT: "#08070a", 800: "#0e0b10", 700: "#141017", 600: "#1b141d", line: "#2a1f2e" },
      },
      fontFamily: {
        display: ['"Pirata One"', "cursive"],
        body:    ['"Space Grotesk"', "sans-serif"],
        serif:   ['"Cormorant Garamond"', "serif"],
      },
      boxShadow: {
        glow:   "0 0 26px rgba(200,16,46,.45)",
        glowlg: "0 0 40px rgba(255,45,85,.5)",
      },
    },
  },
  plugins: [],
}
