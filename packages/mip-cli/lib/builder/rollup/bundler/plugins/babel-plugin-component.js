/**
 * @file babel-plugin-component.js
 * @author clark-t (clarktanglei@163.com)
 */

const {isComponentPath} = require('../../../../utils/project-path')
// const {pathFormat} = require('../../../../utils/helper')
const path = require('path')

module.exports = function ({types: t}) {
  return {
    visitor: {
      Program (nodePath, state) {
        if (!isComponentPath(state.opts.basedir, this.file.opts.filename)) {
          return
        }

        let exportPath

        for (let i = 0; i < nodePath.node.body.length; i++) {
          if (t.isExportDefaultDeclaration(nodePath.node.body[i])) {
            exportPath = nodePath.get(`body.${i}`)
            break
          }
        }

        if (!exportPath) {
          return
        }

        let basename = path.basename(this.file.opts.filename)
        basename = path.basename(basename, path.extname(basename))
        let name = `__mip_component_${basename.replace(/-/g, '_')}__`

        exportPath.replaceWithMultiple([
          t.variableDeclaration(
            'let',
            [
              t.variableDeclarator(
                t.identifier(name),
                exportPath.node.declaration
              )
            ]
          ),
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier('MIP'),
                t.conditionalExpression(
                  t.binaryExpression(
                    '===',
                    t.unaryExpression(
                      'typeof',
                      t.identifier(name),
                      true
                    ),
                    t.stringLiteral('function')
                  ),
                  t.stringLiteral('registerCustomElement'),
                  t.stringLiteral('registerVueCustomElement')
                ),
                true
              ),
              [
                t.stringLiteral(basename),
                t.identifier(name)
              ]
            )
          )
        ])

        nodePath.skip()
      }
    }
  }
}
