// tailwind.config.js
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          red: {
            400: '#f08e98', // Custom pink/red color for the Continue button
            500: '#ea7d87', // Darker shade for hover
            600: '#e63e46', // First aid kit red
          }
        },
      },
    },
    plugins: [],
  }