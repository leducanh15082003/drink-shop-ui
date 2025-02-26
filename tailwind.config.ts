import type { Config } from "tailwindcss";

export default {
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
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        poppins: ['var(--font-poppins)'],
        playfair: ['var(--font-playfair-display)']
      }
    },
  },
  plugins: [],
} satisfies Config;
