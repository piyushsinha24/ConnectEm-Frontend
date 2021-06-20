const { colors, typography, spacing } = require('./src/token/token');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
    },
    fontFamily: {
      ...typography.font,
    },
    fontSize: {
      ...typography.size,
    },
    extend: {
      spacing: {
        ...spacing,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
