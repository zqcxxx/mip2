/**
 * @file alias.js
 * @author clark-t (clarktanglei@163.com)
 */
const alias = require('rollup-plugin-alias')

module.exports = function (options) {
  return alias({
    '@': options.dir
  })
}
