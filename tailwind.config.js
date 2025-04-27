/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // <---- Importante
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      // si usas pages fuera de /src, añádelos
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  