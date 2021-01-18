const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.tsx', './src/**/*.mdx'],
  theme: {
    extend: {
      lineHeight: {
        tighter: 1.1,
      },
      colors: {
        yellow: colors.amber,
      },
    },
    typography: (theme) => ({
      DEFAULT: {
        css: {
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
  variants: {
    extend: {
      rotate: ['group-hover'],
      overflow: ['hover'],
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
