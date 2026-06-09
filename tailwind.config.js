/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],

  safelist: [
    'print:text-black',
    'print:bg-white',
    'print:block',
    'print:inline',
    'print:mt-0',
    'print:mb-0',
    'print:p-0',
    'print:shadow-none',
    'print:ring-0',
  ],

  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        bg2: 'var(--bg2)',
        bg3: 'var(--bg3)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        teal: 'var(--teal)',
        purple: 'var(--purple)',
        blue: 'var(--blue)',
        muted: 'var(--muted)',
        border: 'var(--border)',
      },
      fontFamily: {
        sans:  ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        mono:  ['var(--font-mono)'],
      },
      fontSize: {
        'eyebrow': ['0.6rem', { letterSpacing: '0.25em', lineHeight: '1' }],
        'label':   ['0.58rem', { letterSpacing: '0.2em', lineHeight: '1' }],
        'micro':   ['0.55rem', { letterSpacing: '0.12em', lineHeight: '1' }],
      },
      borderRadius: {
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
        xl: '8px',
      },
      boxShadow: {
        card: '0 4px 14px rgba(0, 0, 0, 0.2)',
        gold: '0 8px 32px rgba(198, 168, 91, 0.15)',
      },
      borderColor: {
        DEFAULT: 'var(--border)',
      },
      backgroundImage: {
        'gold-divider': 'linear-gradient(to right, transparent, #1e2028, #c6a85b 50%, #1e2028, transparent)',
      },
    },
  },
  plugins: [],
};