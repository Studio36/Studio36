import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        black: "#181818",
        white: '#f1f1f1',
        purewhite: "#ffffff"
      },
    },
    fontFamily: {
      "hedwig" : "Hedvig Letters Serif",
    }
  },
  plugins: [],
} satisfies Config;
