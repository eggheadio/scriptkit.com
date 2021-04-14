const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.tsx', './src/**/*.mdx'],
  theme: {
    extend: {
      lineHeight: {
        tighter: 1.1,
      },
      colors: {
        ...colors,
      },
      fontFamily: {
        sans: ['Articulat', ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '*': {
              color: theme('colors.gray.200'),
            },
            code: {
              background: theme('colors.yellow.200'),
              fontWeight: 'bold',
              padding: '2px 5px',
              borderRadius: 3,
              fontSize: '90%',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
