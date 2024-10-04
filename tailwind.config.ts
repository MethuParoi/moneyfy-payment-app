import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7a9bb1", //medium-light shade of blue.
        secondary: "#cfe0e0", //light shade of cyan.
        accent: "#2b444e", //dark shade of blue.
      },
    },
  },
  plugins: [],
};
export default config;
