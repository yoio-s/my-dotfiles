/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--my-primary)',
        'primary-light': 'var(--my-primary-light)',
        'primary-lighter': 'var(--my-primary-lighter)',
        'primary-lightest': 'var(--my-primary-lightest)',
        'primary-dark': 'var(--my-primary-dark)',
        green: 'var(--my-green)',
        'green-light': 'var(--my-green-light)',
        'green-dark': 'var(--my-green-dark)',
        blue: 'var(--my-blue)',
        'blue-light': 'var(--my-blue-light)',
        'blue-lighter': 'var(--my-blue-lighter)',
        'blue-lightest': 'var(--my-blue-lightest)',
        'blue-weight': 'var(--my-blue-weight)',
        red: 'var(--my-red)',
        'red-light': 'var(--my-red-light)',
        gray: {
          1: 'var(--my-gray-1)',
          2: 'var(--my-gray-2)',
          3: 'var(--my-gray-3)',
          4: 'var(--my-gray-4)',
          5: 'var(--my-gray-5)',
          6: 'var(--my-gray-6)',
          7: 'var(--my-gray-7)',
        },
        background: 'var(--my-background)',
      },
      fontFamily: {
        YouSheTitle: ['YouSheTitle'],
        dingtalk: ['DingTalk JinBuTi'],
      },
    },
  },
  plugins: [],
}
