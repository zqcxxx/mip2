/**
 * @file babel-plugin-child-component.js
 * @author clark-t (clarktanglei@163.com)
 */

const glob = require('glob')
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

        let basename = path.basename(this.file.opts.filename)
        let name = path.basename(basename, path.extname(basename))
        let dirname = path.dirname(this.file.opts.filename)

        let components = glob.sync(`${name}-*.@(vue|js)`, {
          cwd: dirname,
          root: dirname,
          nodir: true
        })

        if (!components.length) {
          return
        }

        components.forEach(component => {
          let source = `./${component}`
          let basename = path.basename(component, path.extname(component))
          let name = `__mip_child_component_${basename.replace(/-/g, '_')}__`

          nodePath.unshiftContainer(
            'body',
            t.expressionStatement(
              t.callExpression(
                t.memberExpression(
                  t.identifier('MIP'),
                  t.ConditionalExpression(
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
          )

          nodePath.unshiftContainer(
            'body',
            t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier(name))],
              t.stringLiteral(source)
            )
          )
        })
      }
    }
  }
}
