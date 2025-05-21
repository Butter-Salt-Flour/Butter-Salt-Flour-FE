import type { Config } from 'tailwindcss';
import { colors } from '@/constants/color/color';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
  plugins: [],
};

export default config;
