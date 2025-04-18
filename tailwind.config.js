/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}"
    ],
    theme: {
        extend: {
            animation: {
                shine: 'shine 15s linear infinite',
            },
            keyframes: {
                shine: {
                    '0%': { backgroundPosition: '200% 0%' },
                    '100%': { backgroundPosition: '-200% 0%' },
                },
            },
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif'],
                playstation: ['PlayStation', 'sans-serif'],
                sans: ['Open Sans', 'sans-serif'],
            },
        },
        plugins: [],
    }
}
