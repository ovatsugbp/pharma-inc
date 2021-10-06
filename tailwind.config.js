module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            sans: ["Helvetica", "Arial", "sans-serif"],
        },
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            huge: "1536px",
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
