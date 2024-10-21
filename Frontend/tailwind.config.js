/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        spin: "spin 0.8s linear infinite",
        wobble1: "wobble1 0.8s ease-in-out infinite",
        wobble2: "wobble2 0.8s ease-in-out infinite",
      },
      keyframes: {
        wobble1: {
          "0%, 100%": { transform: "translateY(0%) scale(1)", opacity: "1" },
          "50%": { transform: "translateY(-66%) scale(0.65)", opacity: "0.8" },
        },
        wobble2: {
          "0%, 100%": { transform: "translateY(0%) scale(1)", opacity: "1" },
          "50%": { transform: "translateY(66%) scale(0.65)", opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
