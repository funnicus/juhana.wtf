/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'image-grey': '#e8e8e8',
				'color-primary': '#e8e8e8',
				'color-secondary': '#7c959a',
				'color-tertiary': '#8490b2',
				'color-neutral': '#8e9192',

				'color-primary-dark': '#001f24',
				'color-secondary-dark': '#051f23',
				'color-tertiary-dark': '#0e1b37',
				'color-error': '#ba1a1a',
				'color-error-dark': '#410002',

				'color-text-primary': '#97f0ff',
				'color-text-secondary': '#cde7ec',
				'color-text-tertiary': '#dae2ff',
				'color-text-error': '#ffdad6',

				'color-outline': '#6f797b'
			},
			animation: {
				wave: 'wave 0.5s 2 ease-in-out'
			},
			keyframes: {
				wave: {
					'0%, 100%': { transform: 'rotate(0deg)' },
					'50%': { transform: 'rotate(30deg)' }
				}
			}
		}
	},

	plugins: []
};

module.exports = config;
