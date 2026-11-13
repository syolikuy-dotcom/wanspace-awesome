import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: token("bg"),
        foreground: token("fg"),
        muted: token("muted"),
        card: token("card"),
        soft: token("soft"),
        line: token("line"),
        brand: token("brand"),
        "brand-fg": token("brand-fg"),
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        float: "0 14px 44px -14px rgb(0 0 0 / 0.22)",
        soft: "0 2px 22px -8px rgb(0 0 0 / 0.1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-50%,0,0)" },
        },
        float: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-8px,0)" },
        },
        "marquee-reverse": {
          from: { transform: "translate3d(-50%,0,0)" },
          to: { transform: "translate3d(0,0,0)" },
        },
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(40px,-30px,0) scale(1.08)" },
        },
        scrolldot: {
          "0%": { transform: "translate3d(0,0,0)", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { transform: "translate3d(0,12px,0)", opacity: "0" },
        },
        blink: {
          "0%,49%": { opacity: "1" },
          "50%,100%": { opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        float: "float 5s ease-in-out infinite",
        blink: "blink 1s steps(1) infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        "marquee-slow": "marquee 55s linear infinite",
        "marquee-slow-reverse": "marquee-reverse 55s linear infinite",
        drift: "drift 16s ease-in-out infinite",
        "drift-slow": "drift 22s ease-in-out infinite reverse",
        scrolldot: "scrolldot 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
