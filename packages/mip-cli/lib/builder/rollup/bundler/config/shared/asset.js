/**
 * @file asset.js
 * @author clark-t (clarktanglei@163.com)
 */
const path = require('path')
const {hash, pathFormat} = require('../../../../../utils/helper')
// const hash = require('postcss-url/src/lib/hash')

module.exports = function (options) {
  const outputPath = path.resolve(options.outputPath, 'assets')
  const publicPath = (options.publicPath || options.asset).replace(/([^/]$)/, '$1/') + 'assets/'

  let asset = {}
  let name
  let url
  let dist

  return {
    outputPath: outputPath,
    publicPath: publicPath,
    load (filename, content) {
      asset.filename = filename
      asset.content = content
      asset.extname = path.extname(filename)
      asset.basename = path.basename(filename, asset.extname)
      asset.hash = hash(content)

      name = asset.basename + '-' + asset.hash + asset.extname
      dist = path.resolve(outputPath, name)

      if (options.NODE_ENV === 'development') {
        url = path.relative(options.dir, filename)
        url = `/${pathFormat(url, false)}`
      } else {
        url = `${publicPath}${name}`
      }
    },
    get asset () {
      return asset
    },
    get name () {
      return asset.basename + '-' + asset.hash + asset.extname
    },
    get url () {
      return url
    },
    get dist () {
      return dist
    }
  }
}
