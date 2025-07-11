/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				'playwrite': ['Playwrite IN', 'serif']
			},
			keyframes: {
				'appearance': {
					'from': {
						scale: "0.8",
						opacity: "0",
						transform: "translateY(30px)",
					},
					'to': {
						scale: "1",
						opacity: "1",
						transform: "none",
					},
				},
				'disappearance': {
					'to': {
						opacity: '0',
						scale: '0.8',
					},
				},
			},
			'animation': {
				'appearance': "appearance .2s ease",
				'disappearance': "disappearance .2s ease forwards"
			},
		},
	},
	plugins: [],
};
