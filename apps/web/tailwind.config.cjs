/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        card: 'var(--bg-secondary)',
        textp: 'var(--text)',
        texts: 'var(--text-secondary)',
        borderc: 'var(--border)',
        accent: 'var(--accent)',
        acch: 'var(--accent-hover)',
        accs: 'var(--accent-soft)',
      },
      borderRadius: {
        card: 'var(--radius)',
      },
      boxShadow: {
        card: 'var(--shadow)',
      },
      maxWidth: {
        phone: '480px',
      },
      fontFamily: {
        body: ['var(--font-body)'],
        display: ['var(--font-display)'],
      },
      zIndex: {
        base: '10',
        overlay: '20',
        modal: '30',
      },
    },
  },
  plugins: [],
};
