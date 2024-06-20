/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        taslimbaby: {
          primary: "#f97316",
          "primary-content": "#ffffff",
          secondary: "#F14D5F",
          accent: "#C24B8A",
          neutral: "#2F4858",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
