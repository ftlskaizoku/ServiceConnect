/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-dm-serif)', 'Georgia', 'serif'],
      },
      colors: {
        ink:     'var(--ink)',
        surface: 'var(--surface)',
        amber:   'var(--amber)',
        emerald: 'var(--emerald)',
      },
    },
  },
  plugins: [],
};
