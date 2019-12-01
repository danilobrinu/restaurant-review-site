const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.js', './public/index.html'],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
});
const cssnano = require('cssnano')({
  preset: 'default',
});

const common = [tailwindcss, autoprefixer];
const development = [];
const production = [purgecss, cssnano];

module.exports = {
  plugins: [...common, ...(process.env.NODE_ENV === 'development' ? development : production)],
};
