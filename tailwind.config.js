/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    plugins: [],
    theme: {
        extend: {
            colors: {
                peri: {
                    light: "#E0E1FF",
                    DEFAULT: "#B9BBEC",
                    dark: "#6D6FA1",
                    darker: "#56566E"
                },
                mustard: {
                    DEFAULT: "#EDE3B9",
                    dark: "#A1945D",
                }
            }
        }
    }
}
