import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx",  "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
       colors: {
        'dark-white': '##F4F4F4',
      },
    },

    screens: {
      mb: { max: "455px" },
      tsm: { min: "455px", max: "666px" },
      sm: { min: "666px", max: "810px" },
      md: { min: "810px", max: "1023px" },
      lg: { min: "1024px", max: "1116px" },
      xl: { min: "1116px", max: "1535px" },
      xxl: { min: "1536px" },
    },
  },
  plugins: [],
} satisfies Config;
