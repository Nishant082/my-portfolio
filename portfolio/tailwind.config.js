export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // This makes 'Inter' the primary font for the whole app
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}