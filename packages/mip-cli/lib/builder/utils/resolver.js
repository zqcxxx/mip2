/**
 * @file resolver.js
 * @author clark-t (clarktanglei@163.com)
 */

const path = require('path')
const aliasRegExp = /^~?@\//
const nodeModulesExp = /^~?(@?[a-zA-Z])/

module.exports = function resolver (id, context, rootDir) {
  if (aliasRegExp.test(id)) {
    return path.resolve(dir, id.replace(aliasRegExp, ''))
  }

  if (nodeModulesExp.test(id)) {
    return path.resolve(dir, 'node_modules', id.replace(nodeModulesExp, '$1'))
  }

  return path.resolve(dir, id)
}
