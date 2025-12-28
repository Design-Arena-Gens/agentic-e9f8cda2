import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono]
      },
      colors: {
        surface: {
          DEFAULT: "hsl(var(--surface) / <alpha-value>)",
          foreground: "hsl(var(--surface-foreground) / <alpha-value>)"
        },
        neutral: {
          950: "#0f0f10"
        }
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translate3d(0, 16px, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out"
      }
    }
  }
};

export default config;
