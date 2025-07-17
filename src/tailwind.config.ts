/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}",
    ],
    theme: {
      extend: {
        colors: {
          // Define a single custom color
          'custom-red': '#FF6347', // A unique tomato red
  
          // Define a custom color palette (highly recommended for consistency)
          // You can use a tool like https://www.tailwindshades.com/ to generate these shades
          'brand-primary': {
            50: '#f0f3ff',
            100: '#e0e7ff',
            200: '#c2c9ff',
            300: '#a3a9ff',
            400: '#8589ff',
            500: '#6666FF', // Your main brand primary color
            600: '#5454CC',
            700: '#414199',
            800: '#2e2e66',
            900: '#1a1a33',
            950: '#0d0d1a',
          },
          'brand-secondary': {
            50: '#fffbea',
            100: '#fff4d3',
            200: '#ffe8a8',
            300: '#ffdb7c',
            400: '#ffce51',
            500: '#FFC125', // Your main brand secondary color
            600: '#cc9a1f',
            700: '#997417',
            800: '#664e10',
            900: '#332708',
            950: '#1a1404',
          },
        },
      },
    },
    plugins: [],
  }