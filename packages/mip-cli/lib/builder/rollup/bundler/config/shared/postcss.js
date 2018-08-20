/**
 * @file postcss-shared.js
 * @author clark-t (clarktanglei@163.com)
 */

// rollup-plugin-vue 目前暂时不支持异步的 postcss 插件...
// 所以凡是用到异步的模块 全都要改写成同步的
// 同时要随时关注 rollup-plugin-vue 的进展，随时将这些手写的同步模块逐步替换成异步模块

const path = require('path')
const autoprefixer = require('autoprefixer')
const url = require('postcss-url')
// 异步模块
// const imports = require('postcss-import')
const importSync = require('postcss-import-sync')
const getFile = require('postcss-url/src/lib/get-file')
const inline = require('postcss-url/src/type/inline')
const {prepareAsset} = require('postcss-url/src/lib/paths')
const fs = require('fs-extra')
const sharedAsset = require('./asset')
const {pathFormat} = require('../../../../../utils/helper')

const aliasRegExp = /^~?@\//
const nodeModulesExp = /^~?@?[a-zA-Z]/

module.exports = {
  options (options) {
    // return
  },
  plugins (options) {
    let assetOpts = sharedAsset(options)

    return [
      importSync({
        resolve (asset, baseDir) {
          if (aliasRegExp.test(asset)) {
            return path.resolve(options.dir, asset.replace(aliasRegExp, ''))
          }

          if (nodeModulesExp.test(asset)) {
            return path.resolve(options.dir, 'node_modules', asset.replace(nodeModulesExp, ''))
          }

          return path.resolve(baseDir, asset)
        }
      }),
      autoprefixer({
        browsers: ['> 1%', 'last 2 versions', 'ie 9-10']
      }),
      url({
        url (asset, dir, options, decl, warn, result, addDependency) {
          if (aliasRegExp.test(asset.url)) {
            asset = prepareAsset(asset.url.replace(aliasRegExp, ''), dir, decl)
          }

          return inline(asset, dir, options, decl, warn, result, addDependency)
        },
        // url: 'inline',
        maxSize: 5,
        basePath: path.dirname(options.filename),
        assetsPath: assetOpts.outputPath,
        fallback (asset, dir, opts, decl, warn, result, addDependency) {
          let file = getFile(asset, opts, dir, warn)
          addDependency(file.path)

          if (options.NODE_ENV === 'development') {
            let key = path.relative(options.dir, asset.absolutePath)
            key = pathFormat(key, false)
            return `/${key}`
          }

          assetOpts.setAsset(file.path, file.contents)

          let {dist, outputPath, url} = assetOpts
          // let outputPath = assetOpts.output

          // let file = getFile(asset, opts, dir, warn)
          // let name = assetOpts.getName(file.path, file.contents)

          // let dist = path.resolve(outputPath, name)

          if (!fs.existsSync(dist)) {
            fs.ensureDirSync(outputPath)
            fs.writeFileSync(dist, file.contents, 'utf-8')
          }

          return url
          // return assetOpts.publicPath + name
        }
      })
    ]
  }
}
