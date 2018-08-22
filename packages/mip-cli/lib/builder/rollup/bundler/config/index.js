/**
 * @file config.js
 * @author clark-t (clarktanglei@163.com)
 */

module.exports = function (options) {
  const plugin = name => {
    let conf = require(`./${name}`)
    if (typeof conf === 'function') {
      return conf(options)
    }

    return conf
  }

  let rollupConfig = {
    input: options.filename,
    plugins: [
      plugin('alias'),
      plugin('unbundle'),
      plugin('vue'),
      plugin('babel'),
      plugin('postcss'),
      plugin('url'),
      plugin('replace'),
      plugin('node-resolve'),
      plugin('commonjs')
    ]
  }

  return rollupConfig
}
