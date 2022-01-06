module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", //false, // or 'media' or 'class'
  daisyui: {
    styled: true,
    themes: false,
    rtl: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sahel: ["sahel"],
        sahelbold: ["sahelbold"],
      },
      colors: {
        main: "#F5F5F5",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
