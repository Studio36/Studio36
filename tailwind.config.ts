import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			black: '#181818',
  			white: '#f1f1f1',
  			purewhite: '#ffffff',
  			red: '#FF3F3F'
  		},
  	},
  	fontFamily: {
  		'hedwig': 'Hedvig Letters Serif'
  	},
	transitionTimingFunction: {
		'custom': 'cubicBezier(0.65, 0, 0.35, 1)'
	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
