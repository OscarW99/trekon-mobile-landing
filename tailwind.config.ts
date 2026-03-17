import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        background: '#080C08',
        surface: 'rgba(255,255,255,0.04)',
        'surface-light': 'rgba(255,255,255,0.08)',
        'surface-border': 'rgba(255,255,255,0.1)',
        accent: {
          DEFAULT: '#4ADE80',
          dark: '#16A34A',
          glow: 'rgba(74,222,128,0.15)',
        },
        ink: {
          DEFAULT: '#F0FDF4',
          secondary: 'rgba(240,253,244,0.6)',
          muted: 'rgba(240,253,244,0.35)',
        },
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.32,0.72,0,1) both',
        'fade-in': 'fade-in 0.5s ease both',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
