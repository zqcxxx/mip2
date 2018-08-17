/**
 * @file postcss.js
 * @author clark-t (clarktanglei@163.com)
 */
const shared = require('./shared/postcss')

module.exports = function (options) {
  // let opts = shared.options(options)
  let plugins = shared.plugins(options)

  return {
    extensions: ['.css', '.less', '.styl', '.stylus'],
    extract: false,
    plugins: plugins
  }
}
