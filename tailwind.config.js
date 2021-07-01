const {
  colors,
  typography,
  spacing,
  maxWidths,
  borederRadius,
  borderWidth,
  shadows,
  minHeight,
} = require('./src/token/token');

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
    maxWidth: {
      ...maxWidths,
    },
    extend: {
      minHeight: {
        ...minHeight,
      },
      spacing: {
        ...spacing,
      },
      borderRadius: {
        ...borederRadius,
      },
      borderWidth: {
        ...borderWidth,
      },
      boxShadow: {
        ...shadows,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
