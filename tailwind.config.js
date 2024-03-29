/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white: "#ffffff",
      cokewhite: "#FAFAFA",
      smokewhite: "#F0F0F0",
      "faded-white": "FFFFFFE6",
      black: "#000000",
      green: "#1F302B",
      "faded-green": "#42504C",
      "selection-green": "#2C4840",
      "bright-green": "#00FF38",
      "green-500": "#22c55e",
      "red-500": "#ef4444",
      red: "#EE4B2B",
      "purple-500": "#a855f7",
      "yellow-500": "#eab308",
      "dark-gray": "#323232",
      "faded-dark-gray": "#414141",
      "medium-gray": "#747272",
      "light-gray": "#C7C7C7",
      "darker-gray": "#2F2F2F",
      "another-gray": "#4A4A4A",
      "selection-gold": "#E8CD3D",
      gold: "#E4C419",
    },
    extend: {
      borderRadius: {
        lg: "0.5rem",
      },
    },
  },
  plugins: [],
};
