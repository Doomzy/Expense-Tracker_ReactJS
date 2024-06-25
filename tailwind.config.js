/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#33C73D",
        red: "#CC2936",
        primary: { normal: "#08415C", dark: "#063348" },
        secondary: { normal: "#F1BF98", dark: "#e8a673" },
      },
    },
  },
  plugins: [],
};
