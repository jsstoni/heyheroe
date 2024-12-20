import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
      },
      backgroundImage: {
        hero: "url('/background.webp')",
      },
      container: {
        center: true,
        screens: {
          sm: '100%',
          md: '768px',
          lg: '1024px',
          xl: '1124px',
          '2xl': '1536px',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
