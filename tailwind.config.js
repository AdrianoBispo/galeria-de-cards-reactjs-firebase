import withMT from "@material-tailwind/react/utils/withMT";
import typography from '@tailwindcss/typography'; // <-- Importa o plugin

/** @type {import('tailwindcss').Config} */
const config = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography, // <-- Usa a variável importada aqui
  ],
});

export default config; // <-- Usa export default