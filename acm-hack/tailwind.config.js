// tailwind.config.js
module.exports = {
    theme: {
        extend: {
            fontFamily: {
                robotoMono: ["Roboto Mono", ...fontFamily.sans],
                sans: ['Times New Roman', 'Times', 'serif'],

            },
        },
    },
    plugins:
        [],
    content:
        [
            './app/**/*.{js,ts,jsx,tsx}',
            './pages/**/*.{js,ts,jsx,tsx}',
            './components/**/*.{js,ts,jsx,tsx}',
        ],
}
;