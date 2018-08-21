/**
 * @file replace.js
 * @author clark-t (clarktanglei@163.com)
 */

module.exports = function (options = {}) {
  return {
    values: {
      'process.env.NODE_ENV': JSON.stringify(options.NODE_ENV)
    }
  }
}
