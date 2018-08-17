/**
 * @file vue.js
 * @author clark-t (clarktanglei@163.com)
 */

const shared = require('./shared/postcss')

module.exports = function (options) {
  // let opts = shared.options(options)
  let plugins = shared.plugins(options)

  return {
    include: '**/*.vue',
    css: true,
    style: {
      // postcssOptions: opts,
      postcssPlugins: plugins
    },
    template: {
      transformAssetUrls: true,
      isProduction: options.NODE_ENV !== 'development'
    }
  }
}
