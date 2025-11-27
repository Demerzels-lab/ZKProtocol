/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        // More readable monospace fonts for better legibility
        sans: ['"Consolas"', '"Monaco"', '"Courier New"', 'monospace'], 
        display: ['"Press Start 2P"', 'cursive'],
        mono: ['"Consolas"', '"Monaco"', '"Courier New"', 'monospace'],
      },
      fontSize: {
        // Increased base sizes for better readability
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1.125rem', { lineHeight: '1.5rem' }],
        'lg': ['1.25rem', { lineHeight: '1.75rem' }],
        'xl': ['1.5rem', { lineHeight: '2rem' }],
        '2xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '3xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '4xl': ['3rem', { lineHeight: '1' }],
        '5xl': ['3.75rem', { lineHeight: '1' }],
        '6xl': ['4.5rem', { lineHeight: '1' }],
      },
      colors: {
        // --- YOUR NEW LOGO PALETTE ---
        // 1. Vivid Purple (Main Actions)
        primary: {
          DEFAULT: '#7922ED', 
          50: '#F3E8FF',
          100: '#E9D5FF',
          500: '#7922ED',
          600: '#6D28D9',
          700: '#5016CA', // Linked to Deep Purple
        },
        // 2. Bright Blue (Secondary / Info)
        secondary: {
          DEFAULT: '#3666F2',
          500: '#3666F2',
          600: '#2563EB',
        },
        // 3. Deep Purple (Borders / Text)
        brand: {
          dark: '#5016CA',
        },
        
        // Retro Game Utility Colors
        background: '#F0E1FE', // Fallback to the lighter end of your gradient
        foreground: '#5016CA', // Text color matches deep logo purple
        
        success: {
          DEFAULT: '#00E054', // Retro Green
        },
        warning: {
          DEFAULT: '#FFCC00', // Pacman Yellow
        },
        error: {
          DEFAULT: '#FF004D', // 8-bit Red
        }
      },
      borderRadius: {
        // STRICT 8-BIT MODE: No rounded corners
        lg: '0px',
        md: '0px',
        sm: '0px',
        xl: '0px',
        '2xl': '0px',
        '3xl': '0px',
        full: '9999px', // Only for circular coins/tokens
      },
      boxShadow: {
        // Hard pixel shadows using your Deep Purple (#5016CA)
        sm: '2px 2px 0px 0px #5016CA',
        DEFAULT: '4px 4px 0px 0px #5016CA',
        md: '6px 6px 0px 0px #5016CA',
        lg: '8px 8px 0px 0px #5016CA',
        
        // Pressed state
        'pressed': 'inset 2px 2px 0px 0px rgba(80, 22, 202, 0.5)',
      },
      borderWidth: {
        DEFAULT: '2px', 
        '4': '4px',
      },
      animation: {
        'float': 'float 3s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        }
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
}