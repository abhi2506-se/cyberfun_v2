import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          400: "#38bdf8", 500: "#0ea5e9", 600: "#0284c7"
        }
      },
      fontFamily: {
        display: ["Georgia", "serif"]
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "gradient": "gradient 8s ease infinite",
        "marquee": "marquee 30s linear infinite",
        "marquee2": "marquee2 30s linear infinite",
      },
      keyframes: {
        float:    { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-20px)" } },
        gradient: { "0%,100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
        marquee:  { "0%": { transform: "translateX(0%)" }, "100%": { transform: "translateX(-100%)" } },
        marquee2: { "0%": { transform: "translateX(100%)" }, "100%": { transform: "translateX(0%)" } },
      }
    }
  },
  plugins: []
};
export default config;
