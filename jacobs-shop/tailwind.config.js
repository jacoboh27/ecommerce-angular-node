module.exports = {
    purge: [
      // Paths to all of the HTML files that you want Tailwind CSS to process
      './src/**/*.component.html',
      './src/**/*.component.ts',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [],
  };