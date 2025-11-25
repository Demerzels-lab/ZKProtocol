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
			colors: {
				// Cyber-Tech Lite Light Theme Design Tokens
				'cyber-blue': {
					50: '#EFF6FF',
					100: '#DBEAFE',
					500: '#3B82F6',
					600: '#2563EB',
					700: '#1D4ED8',
					DEFAULT: '#3B82F6',
				},
				'cyber-purple': {
					400: '#A855F7',
					500: '#9333EA',
					DEFAULT: '#9333EA',
				},
				'cyber-cyan': {
					400: '#22D3EE',
					500: '#06B6D4',
					DEFAULT: '#22D3EE',
				},
				neutral: {
					50: '#FAFAFA',
					100: '#F5F5F5',
					200: '#E5E5E5',
					400: '#A3A3A3',
					600: '#525252',
					800: '#262626',
				},
				success: {
					500: '#10B981',
				},
				warning: {
					500: '#F59E0B',
				},
				error: {
					500: '#EF4444',
				},
				info: {
					500: '#3B82F6',
				},
				// Legacy compatibility (mapped to cyber-blue)
				primary: {
					50: '#EFF6FF',
					100: '#DBEAFE',
					500: '#3B82F6',
					600: '#2563EB',
					700: '#1D4ED8',
					DEFAULT: '#3B82F6',
				},
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'Consolas', 'monospace'],
			},
			fontSize: {
				xs: '0.75rem',    // 12px
				sm: '0.875rem',   // 14px
				base: '1rem',     // 16px
				lg: '1.125rem',   // 18px
				xl: '1.25rem',    // 20px
				'2xl': '1.5rem',  // 24px
				'3xl': '1.875rem', // 30px
				'4xl': '2.25rem', // 36px
				'5xl': '3rem',    // 48px
			},
			fontWeight: {
				normal: '400',
				medium: '500',
				semibold: '600',
				bold: '700',
			},
			lineHeight: {
				tight: '1.25',
				normal: '1.5',
				relaxed: '1.625',
			},
			spacing: {
				1: '0.25rem',  // 4px
				2: '0.5rem',   // 8px
				3: '0.75rem',  // 12px
				4: '1rem',     // 16px
				6: '1.5rem',   // 24px
				8: '2rem',     // 32px
				12: '3rem',    // 48px
				16: '4rem',    // 64px
				24: '6rem',    // 96px
				32: '8rem',    // 128px
			},
			borderRadius: {
				sm: '4px',
				md: '8px',
				lg: '12px',
				xl: '16px',
				'2xl': '24px',
				full: '9999px',
			},
			boxShadow: {
				'cyber-sm': '0 1px 2px rgba(59, 130, 246, 0.1)',
				'cyber-md': '0 4px 6px rgba(59, 130, 246, 0.15)',
				'cyber-lg': '0 10px 15px rgba(59, 130, 246, 0.2)',
				'glow-primary': '0 0 20px rgba(59, 130, 246, 0.4)',
				'glow-accent': '0 0 15px rgba(147, 51, 234, 0.3)',
				// Legacy compatibility
				card: '0 4px 6px rgba(59, 130, 246, 0.15)',
				'card-hover': '0 10px 15px rgba(59, 130, 246, 0.2)',
				modal: '0 10px 15px rgba(59, 130, 246, 0.2)',
			},
			transitionDuration: {
				fast: '150ms',
				normal: '250ms',
				slow: '350ms',
			},
			transitionTimingFunction: {
				cyber: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
			},
			backgroundImage: {
				'gradient-cyber-primary': 'linear-gradient(135deg, #3B82F6 0%, #9333EA 100%)',
				'gradient-cyber-subtle': 'linear-gradient(135deg, #EFF6FF 0%, #F3E8FF 100%)',
				'gradient-cyber-glow': 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
			},
			backdropBlur: {
				xs: '2px',
				sm: '4px',
				DEFAULT: '8px',
				md: '12px',
				lg: '16px',
				xl: '20px',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'spin': {
					from: { transform: 'rotate(0deg)' },
					to: { transform: 'rotate(360deg)' },
				},
				'pulse-glow': {
					'0%, 100%': { opacity: 1 },
					'50%': { opacity: 0.5 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'spin': 'spin 1s linear infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
