import '~/scss/main.scss';
import 'webp-in-css/polyfill';

const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

const images = importAll(
  require.context("~/images", false, /\.(png|jpe?g|svg|webp)$/)
);