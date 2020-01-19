module.exports = {
  plugins: [
    require('webp-in-css/plugin'),
    require('autoprefixer'),
    require('mqpacker'),
    require('cssnano')({
      preset: [
        'default', {
          discardComments: {
            removeAll: true
          }
        }
      ]
    })
  ]
}