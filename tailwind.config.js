/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        ring: "var(--ring)",
      },
    },
  },
  plugins: [],
};
