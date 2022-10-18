const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'image-grey': '#e8e8e8'
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
