/**
 * @file rollup-plugin-unbundle.js
 * @author clark-t (clarktanglei@163.com)
 * @deprecated rollup-plugin-node-resolve's 'only' options instead when only problem is fixed
 */

const path = require('path')
const {createFilter} = require('rollup-pluginutils')
const minimatch = require('minimatch')

module.exports = function (options = {}) {
  const filter = createFilter(options.include, options.exclude)

  return {
    name: 'unbundle',
    resolveId (importee, importer) {
      if (importer == null) {
        return
      }

      if (/^[^.]+[/\\]/.test(importee)) {
        importee = path.resolve('node_modules', importee)
      } else {
        importer = importer.replace(/\?.*$/, '')
        importee = path.relative(options.baseDir, path.resolve(importer, '..', importee))
      }

      if (filter(importee)) {
        return false
      }
    }
  }
}
