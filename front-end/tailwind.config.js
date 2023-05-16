/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      flamingo: {
        50: '#fef3f2',
        100: '#fee5e2',
        200: '#fdd0cb',
        300: '#fbafa6',
        400: '#f78072',
        500: '#ed5644',
        600: '#da3b28',
        700: '#b72e1e',
        800: '#98291c',
        900: '#7e281e',
        950: '#44110b',
      },
    },
  },
  plugins: [],
};
