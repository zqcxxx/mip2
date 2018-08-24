/**
 * @file babel-plugin-require-ensure.js
 * @author clark-t (clarktanglei@163.com)
 */

module.exports = function ({types: t}) {
  return {
    visitor: {
      CallExpression (path) {
        if (
          !t.isMemberExpression(path.node.callee) ||
          !t.isIdentifier(path.node.callee.object, {name: 'require'}) ||
          !t.isIdentifier(path.node.callee.property, {name: 'ensure'})
        ) {
          return
        }

        if (!path.node.arguments.length > 1) {
          return
        }

        if (!t.isArrayExpression(path.node.arguments[0])) {
          return
        }

        if (!t.isFunctionExpression(path.node.arguments[1]) &&
          !t.isArrowFunctionExpression(path.node.arguments[1])
        ) {
          return
        }

        if (!t.isIdentifier(path.node.arguments[1].params[0], {name: 'require'})) {
          return
        }

        path.node.arguments[1].params = []

        // path.node.arguments[0].elements.forEach((element, index) => {
        //   let elementPath = path.get(`arguments.0.elements.${index}`)
        //   let val = element.value
        //   elementPath.replaceWith(t.stringLiteral(`__mip_remote__${val}__remote_mip__`))
        // })

        path.replaceWith(
          t.callExpression(
            t.memberExpression(
              t.callExpression(
                t.memberExpression(
                  t.identifier('Promise'),
                  t.identifier('all'),
                  false
                ),
                [
                  t.arrayExpression(
                    path.node.arguments[0].elements.map(
                      element => {
                        return t.callExpression(t.import(), [element])
                      }
                    )
                  )
                ]
              ),
              t.identifier('then'),
              false
            ),
            [
              path.node.arguments[1]
            ]
          )
        )

        // path.skip()
      }
    }
  }
}
