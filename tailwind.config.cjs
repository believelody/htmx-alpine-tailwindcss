/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.hbs"],
  theme: {
    extend: {
      animation: {
        'slide-in-left': 'slide-in-left 1s ease-in-out forwards',
        'slide-out-left': 'slide-out-left 1s ease-in-out forwards',
      },
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
      keyframes: {
        'slide-in-left': {
          '0%': {
            opacity: 0,
            transform: 'translateX(-100%)',
            'max-height': 0,
          },
          '25%': {
            opacity: 1,
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
            'max-height': '100vh',
          }
        },
        'slide-out-left': {
          '0%': {
            opacity: 1,
            transform: 'translateX(0)',
            'max-height': '100vh',
          },
          '75%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
            transform: 'translateX(-100%)',
            'max-height': 0,
          },
        }
      }
    },
  },
  plugins: [],
}
