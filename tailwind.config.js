/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Incluye tus archivos de React
    "./node_modules/flowbite/**/*.js", // Incluye Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"), // Añade el plugin de Flowbite
  ],
};
