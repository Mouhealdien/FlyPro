/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],

    theme: {
        extend: {
            colors: {
                primery: "#1a1f71",
                primeryLight: "#196dfb",
                secondary: "#fe56a1",
                pink: "#ff56a2"

            },
            backgroundColor: {
                "pagination-dot-color": "#79A379", // Change to your desired color
            },
            gradientColorStops: {
                "primery-black": "var(--primery-color), black", // Replace '--primary-color' with your primary color
            },
            fontFamily: {
                Aeulis: "Aeulis Alt Medium",
                Copperplate: "Copperplate Gothic BT",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],


};