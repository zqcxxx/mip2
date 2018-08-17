/**
 * @file postcss-shared.js
 * @author clark-t (clarktanglei@163.com)
 */

const path = require('path')
const autoprefixer = require('autoprefixer')
const url = require('postcss-url')
const getFile = require('postcss-url/src/lib/get-file')
const fs = require('fs-extra')
const sharedAsset = require('./asset')

module.exports = {
  options (options) {
    return
  },
  plugins (options) {
    let assetOpts = sharedAsset(options)
    return [
      autoprefixer({
        browsers: ['> 1%', 'last 2 versions', 'ie 9-10']
      }),
      url({
        url: 'inline',
        maxSize: 5,
        basePath: path.dirname(options.filename),
        assetsPath: path.resolve(options.outputPath, 'img'),
        fallback (asset, dir, opts, decl, warn, result, addDependency) {
          let publicPath = options.asset.replace(/([^/])$/, '$1/')
          let outputPath = assetOpts.output

          let file = getFile(asset, opts, dir, warn)
          let name = assetOpts.getName(file.path, file.contents)

          let dist = path.resolve(outputPath, name)
          if (!options.fs.existsSync(dist)) {
            fs.ensureDirSync(outputPath, {fs: options.fs})
            options.fs.writeFileSync(dist, file.contents, 'utf-8')
          }

          addDependency(file.path)
          return publicPath + name
        }
      })
    ]
  }
}
