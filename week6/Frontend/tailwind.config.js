/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#ec4899', // 브랜드 컬러 pink-500
        'layout-bg': '#171717', // 레이아웃 배경색 zinc-800
        'outlet-bg': '#18181b', // 아웃렛 배경색 zinc-900
        'font-primary': '#fafafa', // 주요 글자색 zinc-50
      },
    },
  },
  plugins: [],
};
