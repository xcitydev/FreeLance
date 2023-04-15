/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        VT323: ["VT323", "regular"],
        Abril: ["IBM Plex Mono", "regular"],
      },
    },
  },
  plugins: [],
};
