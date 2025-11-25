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
				// Design tokens from design-tokens.json
				primary: {
					50: '#EEF2FF',
					100: '#E0E7FF',
					500: '#6366F1',
					600: '#4F46E5',
					900: '#312E81',
					DEFAULT: '#6366F1',
				},
				neutral: {
					50: '#FAFAFA',
					100: '#F5F5F5',
					200: '#E5E5E5',
					500: '#A3A3A3',
					700: '#404040',
					900: '#171717',
				},
				success: {
					50: '#ECFDF5',
					500: '#10B981',
				},
				warning: {
					50: '#FFFBEB',
					500: '#F59E0B',
				},
				error: {
					50: '#FEF2F2',
					500: '#EF4444',
				},
				background: {
					page: '#FAFAFA',
					surface: '#FFFFFF',
				},
			},
			fontFamily: {
				sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
				mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
			},
			fontSize: {
				hero: '64px',
				title: '48px',
				subtitle: '32px',
				'body-large': '20px',
				body: '16px',
				small: '14px',
				caption: '12px',
			},
			spacing: {
				xs: '8px',
				sm: '16px',
				md: '24px',
				lg: '32px',
				xl: '48px',
				'2xl': '64px',
				'3xl': '96px',
				'4xl': '128px',
			},
			borderRadius: {
				sm: '8px',
				md: '12px',
				lg: '16px',
				xl: '24px',
				full: '9999px',
			},
			boxShadow: {
				card: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
				'card-hover': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
				modal: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
				'privacy-glow': '0 0 0 3px rgba(99, 102, 241, 0.1)',
			},
			transitionDuration: {
				fast: '200ms',
				base: '250ms',
				slow: '300ms',
			},
			transitionTimingFunction: {
				'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
				'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
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
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'spin': 'spin 1s linear infinite',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
