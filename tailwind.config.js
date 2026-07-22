/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'media',
  theme: {
    colors: {
      light: require('./constants/theme').colors.light,
      dark: require('./constants/theme').colors.dark,
    },
    spacing: require('./constants/theme').space,
    fontFamily: require('./constants/theme').typography.fontFamily,
    fontSize: require('./constants/theme').typography.fontSize,
    fontWeight: require('./constants/theme').typography.fontWeight,
    lineHeight: require('./constants/theme').typography.lineHeight,
    letterSpacing: require('./constants/theme').typography.letterSpacing,
    borderRadius: require('./constants/theme').radii,
    boxShadow: require('./constants/theme').shadows,
    opacity: require('./constants/theme').opacity,
  },
  plugins: [],
};
