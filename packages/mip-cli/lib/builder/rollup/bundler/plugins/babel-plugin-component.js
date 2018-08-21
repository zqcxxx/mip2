/**
 * @file babel-plugin-component.js
 * @author clark-t (clarktanglei@163.com)
 */

const {isComponentPath} = require('../../../../utils/project-path')
const {pathFormat} = require('../../../../utils/helper')
const path = require('path')

module.exports = function ({types: t}) {
  return {
    visitor: {
      Program (nodePath, opts) {
        if (!isComponentPath(opts.opts.basedir, this.file.opts.filename)) {
          return
        }

        let basename = path.basename(this.file.opts.filename)
        let name = path.basename(basename, path.extname(basename))
        let dirname = path.dirname(this.file.opts.filename)

        let exportPath

        for (let i = 0; i < nodePath.node.body.length; i++) {
          if (t.isExportDefaultDeclaration(nodoPath.node.body[i])) {
            exportPath = nodePath.get(`body.${i}`)
            break;
          }
        }

        if (!exportPath) {
          return
        }

        let val = exportPath.node.declaration
        exportPath.replaceWith(
        )
      }
    }
  }
}
