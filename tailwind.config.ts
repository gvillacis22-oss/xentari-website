import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background colors - Premium charcoal system
        background: {
          DEFAULT: "#0B0B0D",
          card: "#151518",
          subtle: "#111113",
          elevated: "#1A1A1D",
          surface: "#111113",
        },
        // Accent colors - Fire Orange
        accent: {
          DEFAULT: "#FF6B35",
          light: "#FF8C5A",
          dark: "#E55A2B",
          glow: "rgba(255, 107, 53, 0.4)",
          subtle: "rgba(255, 107, 53, 0.1)",
        },
        // Text colors
        text: {
          primary: "#FFFFFF",
          secondary: "#A3A3A3",
          muted: "#737373",
          dark: "#404040",
        },
        // Border colors
        border: {
          DEFAULT: "#262626",
          light: "#404040",
          accent: "#FF6B35",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "hero-mobile": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-mobile": ["1.75rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
      },
      boxShadow: {
        "glow": "0 0 20px rgba(255, 107, 53, 0.4)",
        "glow-lg": "0 0 40px rgba(255, 107, 53, 0.3)",
        "glow-sm": "0 0 10px rgba(255, 107, 53, 0.3)",
        "card": "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "spin-slow": "spin 60s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 107, 53, 0.4)" },
          "50%": { boxShadow: "0 0 30px rgba(255, 107, 53, 0.6)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-dark": "linear-gradient(to bottom, #0A0A0A, #141414)",
        "gradient-accent": "linear-gradient(135deg, #FF6B35, #E55A2B)",
      },
    },
  },
  plugins: [],
};

export default config;
