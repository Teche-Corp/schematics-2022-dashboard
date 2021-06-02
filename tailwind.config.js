const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#161616',
          100: '#333333',
          400: '#252525',
          700: '#000000',
        },
        light: {
          DEFAULT: '#f3f3f3',
          100: '#ffffff',
          400: '#fefefe',
          700: '#eef3f9',
        },
        cyan: colors.cyan,
        npc: {
          DEFAULT: '#c93d45',
          100: '#ffbbbc',
          400: '#fd7d7e',
          700: '#fd5457',
        },
        nlc: {
          DEFAULT: '#fccc00',
          100: '#fde466',
          400: '#ffb349',
          700: '#fe6021',
        },
        nst: {
          DEFAULT: '#18a489',
          100: '#95dc8e',
          400: '#53c97f',
          700: '#138176',
        },
        reeva: {
          DEFAULT: '#008bd0',
          100: '#a3e1fa',
          400: '#77bede',
          700: '#3d7196',
        },
      },
    },
  },
  variants: {
    extend: {
      scale: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
