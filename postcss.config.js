const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.js', './public/index.html'],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

const common = [tailwindcss, autoprefixer];
const development = [];
const production = [purgecss];

module.exports = {
  plugins: [...[common], ...(process.env.NODE_ENV === 'development' ? development : production)],
};
