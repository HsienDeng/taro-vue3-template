/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{vue,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false,
  },
};
