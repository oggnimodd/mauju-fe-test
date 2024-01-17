import generateColors from "./tailwind/openColor";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./@playground/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...generateColors(),
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  darkMode: ["class", '[data-mantine-color-scheme="dark"]'],
};
