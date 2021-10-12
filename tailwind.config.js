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
      fontSize: {
        xxs: '0.65rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '*, code, strong, blockquote': {
              color: theme('colors.gray.200'),
            },
            a: {
              color: theme('colors.yellow.300'),
              textDecoration: 'none',
            },
            'a:hover': {
              textDecoration: 'underline',
            },
            'code:before': {
              content: '""',
            },
            'code:after': {
              content: '""',
            },
            pre: {
              background: theme('colors.gray.900'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
