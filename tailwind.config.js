/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: 'class',  // ativa o modo dark baseado em classe
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }

  export default config;