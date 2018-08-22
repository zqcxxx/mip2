/**
 * @file replace.js
 * @author clark-t (clarktanglei@163.com)
 */
const replace = require('rollup-plugin-replace')

module.exports = function (options = {}) {
  return replace({
    values: {
      'process.env.NODE_ENV': JSON.stringify(options.NODE_ENV)
    }
  })
}
