module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#2ec164",

          "secondary": "#ce4f3b",

          "accent": "#60ea90",

          "neutral": "#212A36",

          "base-100": "#3C465D",

          "info": "#5284EF",

          "success": "#20DFC6",

          "warning": "#E3910D",

          "error": "#ED7B73",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
