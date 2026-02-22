/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-panel": "rgb(var(--surface-panel) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--ink-soft) / <alpha-value>)",
        "border-soft": "rgb(var(--border-soft) / <alpha-value>)",
        "brand-cyan": "rgb(var(--brand-cyan) / <alpha-value>)",
        "brand-cyan-strong": "rgb(var(--brand-cyan-strong) / <alpha-value>)",
        "brand-lime": "rgb(var(--brand-lime) / <alpha-value>)",
      },
      boxShadow: {
        "soft-xl": "0 22px 65px -24px rgba(9, 16, 26, 0.5)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(8px)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 850ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-up": "slideUp 900ms cubic-bezier(0.165, 0.84, 0.44, 1) both",
        float: "float 850ms ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
}
