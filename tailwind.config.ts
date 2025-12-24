import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        wave: "wave 2s infinite",
        "star-movement": "animate-star 12s linear infinite",
      },
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14.0deg)" },
          "20%": { transform: "rotate(-8.0deg)" },
          "30%": { transform: "rotate(14.0deg)" },
          "40%": { transform: "rotate(-4.0deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
        "animate-star": {
          "0%": { transform: "rotate(315deg) translateX(0)", opacity: "0.3" },
          "70%": { opacity: "0.3" },
          "100%": { transform: "rotate(315deg) translateX(-1500px)", opacity: "0.3" },
        },
      },
      backgroundImage: {
        "glass-gradient": "linear-gradient(90deg, #fff, transparent)",
      },
    },
  },
  plugins: [animate],
};
export default config;
