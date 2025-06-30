module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/screens/Frame/**/*.{js,jsx,ts,tsx}",
    "./src/screens/Frame/sections/**/*.{js,jsx,ts,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "./index.html",
  ],
  darkMode: "class", // <-- Tailwind uses 'class' strategy; we'll toggle 'light' class manually
  theme: {
    extend: {
      colors: {
        // Define semantic colors using CSS variables for toggling:
        bgFrom: "var(--bg-from)",
        bgTo: "var(--bg-to)",
        textPrimary: "var(--text-primary)",
        highlight: "var(--highlight)",
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // You can keep your other colors here as fallback if needed
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
};
