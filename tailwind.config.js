const {fontFamily} = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/**/*.html',
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        visby: ['var(--font-visby)', ...fontFamily.sans],
        'work-sans': ['var(--font-work-sans)', ...fontFamily.sans],
        'manrope': ['var(--font-manrope)', ...fontFamily.sans],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
