import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        'gradient-start': '#FFDD86',
        'gradient-end': '#FFFBF1',
        'main-primary-yellow': '#ffb800',
        'main-primary-yellow-hover': '#ff7a00',
        'main-secondary-yellow': '#ffea79',
        'main-secondary-yellow-light': '#fff7e1',
        'text-black': '#111827',
        'text-white': '#ffffff',
        'text-gray-light': '#d9d9d9',
        'point-orange': '#ff6746',
        'point-pink': '#ff7081',
        'point-light-orange': '#ffecba',
        'point-light-green': '#8bc60f',
        'point-green': '#2ab58b',
        'bg-gray': '#f5f5f5',
        'bg-light-yellow': '#fffbf1',
      },
    },
    bglist: [
      'bg-point-orange',
      'bg-point-pink',
      'bg-point-light-green',
      'bg-point-green',
    ],
  },
  plugins: [],
};
export default config;
