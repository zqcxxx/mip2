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
// const resolver = require('../../../../utils/resolver')
const sharedAsset = require('./asset')

// const aliasRegExp = /^~?@\//
// const nodeModulesExp = /^~?(@?[a-zA-Z])/

module.exports = {
  plugins (options) {
    let assetOpts = sharedAsset(options)

    return [
      importSync({
        resolve (asset, baseDir) {
          if (aliasRegExp.test(asset)) {
            return path.resolve(options.dir, asset.replace(aliasRegExp, ''))
          }

          if (nodeModulesExp.test(asset)) {
            return path.resolve(options.dir, 'node_modules', asset.replace(nodeModulesExp, '$1'))
          }

          return path.resolve(baseDir, asset)
        }
      }),
      autoprefixer({
        browsers: ['> 1%', 'last 2 versions', 'ie 9-10']
      }),
      url({
        url (asset, dir, opts, decl, warn, result, addDependency) {
          if (aliasRegExp.test(asset.originUrl)) {
            let absolute = path.resolve(options.dir, asset.originUrl.replace(aliasRegExp, ''))
            let relative = path.relative(dir.from, absolute)
            asset = prepareAsset(relative, dir, decl)
          } else if (nodeModulesExp.test(asset.originUrl)) {
            let absolute = path.resolve(options.dir, 'node_modules', asset.originUrl.replace(nodeModulesExp, '$1'))
            let relative = path.relative(dir.from, absolute)
            asset = prepareAsset(relative, dir, decl)
          }

          return inline(asset, dir, opts, decl, warn, result, addDependency)
        },
        maxSize: 5,
        // 当设置了 basePath 之后会优先去找 path.resolve(basePath, id) 所以不能配这个
        // basePath: path.dirname(options.filename),
        assetsPath: assetOpts.outputPath,
        fallback (asset, dir, opts, decl, warn, result, addDependency) {
          let file = getFile(asset, opts, dir, warn)
          addDependency(file.path)

          assetOpts.load(file.path, file.contents)

          let {dist, url} = assetOpts

          if (options.NODE_ENV !== 'development' && !fs.existsSync(dist)) {
            fs.ensureDirSync(path.dirname(dist))
            fs.writeFileSync(dist, file.contents, 'utf-8')
          }

          return url
        }
      })
    ]
  },
  preprocess (options) {
    return {
      less: {

      }
    }
  }
}
