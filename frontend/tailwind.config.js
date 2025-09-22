/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        muted: 'var(--muted)',

        // Card specific
        'card-bg': 'var(--card-background)',
        'card-border': 'var(--card-border)',
        'card-hover-border': 'var(--card-hover-border)',

        // Skills section
        'skill-tag-bg': 'var(--skill-tag-bg)',
        'skill-tag-border': 'var(--skill-tag-border)',

        // Borders
        'border-light': 'var(--border-light)',
        'border-medium': 'var(--border-medium)',
        'border-dark': 'var(--border-dark)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}