/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'shuttle-gray': {
          '50': '#f7f8f8',
          '100': '#eeeef0',
          '200': '#d9dade',
          '300': '#b8bac1',
          '400': '#9094a0',
          '500': '#737884',
          '600': '#606470',
          '700': '#4c4f58',
          '800': '#41434b',
          '900': '#393b41',
          '950': '#26272b',
        },
        'anakiwa': {
          '50': '#f0f9ff',
          '100': '#dff3ff',
          '200': '#b8e7ff',
          '300': '#93deff',
          '400': '#33c2fd',
          '500': '#09abee',
          '600': '#0089cc',
          '700': '#006da5',
          '800': '#045c88',
          '900': '#0a4d70',
          '950': '#06304b',
        },
        'tuna': {
          '50': '#f6f7f9',
          '100': '#eceef2',
          '200': '#d5d8e2',
          '300': '#b1b8c8',
          '400': '#8791a9',
          '500': '#68748f',
          '600': '#535c76',
          '700': '#444b60',
          '800': '#3b4051',
          '900': '#323643',
          '950': '#23262e',
        },
        'black-haze': {
          '50': '#f7f7f7',
          '100': '#efefef',
          '200': '#dcdcdc',
          '300': '#bdbdbd',
          '400': '#989898',
          '500': '#7c7c7c',
          '600': '#656565',
          '700': '#525252',
          '800': '#464646',
          '900': '#3d3d3d',
          '950': '#292929',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        candy: ['var(--candy-beans)']
      },
    },
  },
  plugins: [
    require('daisyui'),
    function ({ addComponents }) {
      addComponents({
        '.no-arrows::-webkit-outer-spin-button': {
          'appearance': 'none',
          'margin': '0',
        },
        '.no-arrows::-webkit-inner-spin-button': {
          'appearance': 'none',
          'margin': '0',
        },
        '.no-arrows': {
          'appearance': 'textfield',
        },
      });
    }
  ],
};
