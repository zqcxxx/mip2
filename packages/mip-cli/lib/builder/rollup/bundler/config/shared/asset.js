/**
 * @file asset.js
 * @author clark-t (clarktanglei@163.com)
 */
const path = require('path')
const {hash} = require('../../../../../utils/helper')
// const hash = require('postcss-url/src/lib/hash')

module.exports = function (options) {
  return {
    output: path.resolve(options.outputPath, 'assets'),
    getName (filename, content) {
      let extname = path.extname(filename)
      let basename = path.basename(filename, extname)
      return basename + '-' + hash(content) + extname
    }
  }
}
