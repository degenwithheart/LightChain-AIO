module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1DA1F2",
        secondary: "#14171A",
        accent: "#F5A623"
      },
      spacing: {
        "128": "32rem",
        "144": "36rem"
      }
    }
  },
  plugins: []
};
