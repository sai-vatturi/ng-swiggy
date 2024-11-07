/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,ts}'],
	theme: {
		extend: {
			fontFamily: {
				gilroy: ['Gilroy', 'sans-serif'],
				gilroybold: ['gilroy-bold', 'sans-serif'],
				proximanova: ['ProximaNova', 'sans-serif'],
				proxima: ['proxima-nova', 'sans-serif']
			},
			colors: {
				sworange: '#FE5005',
				swblack: '#10141F',
				swgray: '#B9B9B9',
				footerGray: 'rgba(2, 6, 12, 0.6)'
			},
			screens: {
				'custom-md': '1000px',
				'custom-lg': '1300px'
			}
		}
	},
	plugins: []
};
