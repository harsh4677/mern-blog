/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  DarkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar'),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};