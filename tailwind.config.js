/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*ts",
        "./resources/**/*.tsx",
    ],
    theme: {
        extend: {
            colors: {
                transparent: "transparent",
                current: "currentColor",
                white: "#ffffff",
                primary: "#ec4899",
                "primary-400": " #f472b6",
                "primary-300": "#f9a8d4",
                "primary-200": "#fbcfe8",
                "primary-50": "#fdf2f8",
                "primary-800": "#9d174d",
                "primary-900": "#831843",
                "red-600": "#dc2626",
            },
        },
    },
    plugins: [],
};
