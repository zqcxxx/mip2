/**
 * @file babel-plugin-dynamic-dependencies.js
 * @author clark-t (clarktanglei@163.com)
 */

module.exports = function ({types: t}) {
  return {
    visitor: {
      CallExpression (path, state) {
        // console.log(path.node.callee)

        // if (path.node.callee.name !== 'require') {
        //   return
        // }
        if (!t.isImport(path.node.callee)) {
          return
        }

        // console.log('---- here ----')
        // if (!t.isImport(path.node.callee)) {
        //   return
        // }

        console.log(path.node.arguments[0].value)
      }
    }
  }
}
