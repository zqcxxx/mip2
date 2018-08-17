/**
 * @file config.js
 * @author clark-t (clarktanglei@163.com)
 */

const unbundle = require('../plugins/rollup-plugin-unbundle')


module.exports = function (conf) {
  let rollupConfig = {
    input: conf.filename,
    plugins: [
      unbundle(config('unbundle', options)),
      vue(config('vue', options)),
      babel(config('babel')),
      nodeResolve(config('node-resolve')),
      commonjs()
    ]
  }
}

function function config (name, options) {
  let conf = require(`./${name}`)
  if (typeof conf === 'function') {
    return conf(options)
  }

  return conf
}
