/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			screens: {
				xs: '321px',
				// => @media (min-width: 321px) { ... }
				sm: '640px',
				// => @media (min-width: 640px) { ... }
				lsm: '767px',
				// => @media (min-width: 767px) { ... }
				mtb: '768px',
				// => @media (min-width: 768px) { ... } //for mini tablet 768x1024 view
				tAir: '820px',
				// => @media (min-width: 820px) { ... } //for Air tablet 820*1180 view
				lAir: '825px',
				// => @media (min-width: 825px) { ... } //for ipad air landscape view
				tPro: '1024px',
				// => @media (min-width: 1024px) { ... } //for Air tablet 1024*1366 view
				lpro: '1336px',
				// =>@media (min-width: 1350px)
				md: '960px',
				// => @media (min-width: 960px) { ... }
				lg: '1440px',
				// => @media (min-width: 1440px) { ... }
				xl: '1536px',
				// => @media (min-width: 1536px) { ... }
				'2xl': '1600px',
				// => @media (min-width: 1600px) { ... }
				'3xl': '1800px',
				// => @media (min-width: 1800px) { ... }
				'4xl': '1900px',
				// => @media (min-width: 1900px) { ... }
			},
			colors: {
				secondary: 'rgba(106, 18, 205, 0.08)',
				primary: 'rgba(121, 28, 226, 1)', //#791CE2
				typography: 'rgba(22, 28, 45, 1)', //headings
				'typography-opacity-70': 'rgba(22, 28, 45, 0.70)', //subheadings
				'dark-cards': 'rgba(46, 56, 84, 1)', //cards bg color
				'text-01': 'rgba(34, 8, 64, 1)', //hero section heading
				'text-02': 'rgba(93, 0, 198, 1)', //hero section dynamic heading
				purple: {
					20: 'rgba(71, 59, 240, 0.2)',
				},
				gray: {
					100: 'rgba(223, 223, 223, 1)',
					secondary: 'rgba(244, 246, 250, 1)'
				},
				border: {
					primary: 'rgba(106, 18, 205, 1)',
					light: 'rgba(255, 255, 255, 1)'
				},
				backgrounds: {
					light: 'rgba(249, 250, 251, 1)',
				},
				
			},
			animation: {
				marquee: 'marquee 25s linear infinite',
				marquee2: 'marquee2 25s linear infinite',
				marquee3: 'marquee 25s linear infinite',
			},
		},
	},
	plugins: [],
};
