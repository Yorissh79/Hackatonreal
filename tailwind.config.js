/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
       animation: {
        'spin-slow': 'spin 10s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'wiggle-small': 'wiggle 0.5s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fadeIn': 'fadeIn 1s ease-in forwards'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        glow: {
          '0%': { textShadow: '0 0 10px #fff' },
          '100%': { textShadow: '0 0 20px #0ff, 0 0 30px #0ff' }
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      }
      ,
      colors: {
        indigo: {
          600: '#4f46e5',
          700: '#4338ca',
        },
      },
       fontFamily: {
      serif: ['"Playfair Display"', 'serif'],
    },
    },
  },
  plugins: [],
}