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
          DEFAULT: '#ED5565',
          100: '#F8C5CA',
          200: '#FFB7B7',
          300: '#FF9F97',
          400: '#EA8686'
        },
        nlc: {
          DEFAULT: '#FFCD46',
          100: '#FFFFCC',
          200: '#FFF0C8',
          300: '#FFCD7C',
          400: '#FFDB7A'
        },
        nst: {
          DEFAULT: '#85D4BE',
          100: '#C3DDE0',
          200: '#DAF1DE',
          300: '#96DFD8',
          400: '#AEE6CB'
        },
        reeva: {
          DEFAULT: '#2E97EE',
          100: '#ACE6FF',
          200: '#78C0FC',
          300: '#70A5D1',
          400: '#3C8ACA'
        },
      },
    },
  },
  variants: {
    extend: {
      scale: ['group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
