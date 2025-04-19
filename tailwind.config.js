/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [ "./src/**/*.{html,ts}" ],
    theme: {
        extend: {
            animation: {
                shine: 'shine 15s linear infinite',
                heartbeat: 'heartbeat 2s infinite',
                glowFade: 'glowFade 2s infinite',
                scaleAndFade: 'scaleAndFade 2s infinite',
                scaleAndFadeBorder: 'scaleAndFadeBorder 2s infinite',
                scaleUp: 'scaleUp 1.5s ease-in-out forwards',
                fadeIn: 'fadeIn 1s ease-out forwards',
                fadeOut: 'fadeOut 1s ease-in forwards',
                fadeInDelayed: 'FadeInDelayed 1.2s ease forwards',
            },
            keyframes: {
                heartbeat: {
                    '0%': { transform: 'scale(1)', opacity: '1' },
                    '3%': { transform: 'scale(0.85)', opacity: '0.3' },
                    '50%, 100%': { transform: 'scale(1)', opacity: '1' },
                },
                glowFade: {
                    '15%, 100%': { opacity: '0' },
                    '55%': { opacity: '1' },
                },
                scaleAndFade: {
                    '0%': { transform: 'scale(0.6)', opacity: '1' },
                    '40%': { opacity: '1' },
                    '80%, 100%': { transform: 'scale(2)', opacity: '0' },
                },
                scaleAndFadeBorder: {
                    '0%': { transform: 'scale(1.5)', borderWidth: '5px', opacity: '1' },
                    '5%': { transform: 'scale(1.3)' },
                    '30%': { opacity: '1' },
                    '60%, 100%': { transform: 'scale(2)', borderWidth: '1px', opacity: '0' },
                },
                scaleUp: {
                    '0%': { opacity: '0', transform: 'scale(0)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                shine: {
                    '0%': { backgroundPosition: '200% 0%' },
                    '100%': { backgroundPosition: '-200% 0%' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeOut: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
                FadeinDelayed: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif'],
                playstation: ['PlayStation', 'sans-serif'],
                sans: ['Open Sans', 'sans-serif'],
            }
        }
    },
    plugins: [],
}
