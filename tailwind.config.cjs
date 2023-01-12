/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.hbs"],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        ...colors,
        primary: colors.indigo,
        secondary: colors.black,
        success: colors.green,
        danger: colors.red,
        info: colors.blue,
        warning: colors.yellow,
      }),
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
}
