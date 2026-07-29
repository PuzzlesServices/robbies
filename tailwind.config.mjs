/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        robbies: {
          navy: '#003B5C',
          ocean: '#005B94',
          blue: '#0077B6',
          teal: '#00A896',
          turquoise: '#028090',
          cyan: '#00A8E8',
          coral: '#FF6B35',
          gold: '#FFB703',
          sand: '#FFFDF9',
          dark: '#0F172A',
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
  },
  plugins: [],
}
