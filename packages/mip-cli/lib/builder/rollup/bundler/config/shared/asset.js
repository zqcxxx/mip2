/**
 * @file asset.js
 * @author clark-t (clarktanglei@163.com)
 */
const path = require('path')
const {hash} = require('../../../../../utils/helper')
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
    // outputPath alias
    // output: outputPath,
    get asset () {
      return asset
    },
    setAsset (fileName, content) {
      asset.filename = fileName
      asset.content = content
      asset.extname = path.extname(fileName)
      asset.basename = path.basename(fileName, asset.extname)
      asset.hash = hash(content)

      name = asset.basename + '-' + asset.hash + asset.extname
      url = `${publicPath}${name}`
      dist = path.resolve(outputPath, name)
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
    // publicPath alias
    // asset: publicPath
  }
}
