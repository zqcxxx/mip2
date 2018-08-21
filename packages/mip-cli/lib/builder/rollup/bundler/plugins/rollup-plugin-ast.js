/**
 * @file rollup-plugin-ast.js
 * @author clark-t (clarktanglei@163.com)
 */

const acorn = require('acorn')

module.exports = function (options = {}) {
  return {
    name: 'rollup-plugin-ast',
    transform (code, id) {
      if (!filter(id)) {
        return
      }

      let ast

      try {
        ast = acorn.parse(code, {
          ecmaVersion: 8,
          sourceType: 'module',
          locations: true,
          ranges: true
        })
      } catch (e) {
        console.warn(`${id} parsing error`)
      }
    }
  }
}
