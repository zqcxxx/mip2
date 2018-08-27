/**
 * @file vue.js
 * @author clark-t (clarktanglei@163.com)
 */

const vue = require('rollup-plugin-vue').default
const shared = require('./shared/postcss')

module.exports = function (options) {
  // let opts = shared.options(options)
  let plugins = shared.plugins(options)

  return vue({
    // include: '**/*.vue',
    css: true,
    style: {
      // postcssOptions: opts,
      postcssPlugins: plugins
    },
    template: {
      transformAssetUrls: true,
      isProduction: options.NODE_ENV !== 'development'
    }
  })
}
