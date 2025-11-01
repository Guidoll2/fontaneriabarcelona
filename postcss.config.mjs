const config = {
  plugins: {
    // Use the main Tailwind PostCSS plugin and autoprefixer.
    // '@tailwindcss/postcss' is not a package — that was causing the "Cannot find module" error.
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
