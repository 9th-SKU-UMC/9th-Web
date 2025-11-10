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
        'layout-bg': '#3f3f46', // 레이아웃 배경색 zinc-700
        'outlet-bg': '#18181b', // 아웃렛 배경색 zinc-900
      },
    },
  },
  plugins: [],
};
