/**
 * @file rollup-plugin-require-context.js
 * @author clark-t (clarktanglei@163.com)
 */

const glob = require('glob')
const path = require('path')
const {pathFormat, hash} = require('../../../../utils/helper')

module.exports = function ({types: t}) {
  return {
    visitor: {
      CallExpression (nodePath, state) {
        if (
          !t.isMemberExpression(nodePath.node.callee) ||
          !t.isIdentifier(nodePath.node.callee.object, {name: 'require'}) ||
          !t.isIdentifier(nodePath.node.callee.property, {name: 'context'})
        ) {
          return
        }

        if (!nodePath.node.arguments.length > 0) {
          return
        }

        if (!t.isStringLiteral(nodePath.node.arguments[0])) {
          return
        }

        if (nodePath.node.arguments[1] != null && !t.isBooleanLiteral(nodePath.node.arguments[1])) {
          return
        }

        if (nodePath.node.arguments[2] != null && !t.isRegExpLiteral(nodePath.node.arguments[2])) {
          return
        }

        let filename = this.file.opts.filename
        let dirname = path.dirname(filename)

        let args = nodePath.node.arguments
        let dir = path.resolve(dirname, args[0].value)
        let recursive = args[1] && args[1].value
        let regexp = args[2] && new RegExp(args[2].pattern, args[2].flags)

        let paths = getPaths(dir, recursive, regexp)

        let infos = paths.map(filepath => {
          let absolute = path.resolve(dir, filepath)
          let relative = path.relative(dirname, absolute)
          let moduleKey = pathFormat(relative).replace(/^([^.])/, './$1')
          let moduleId = `_require_context_${hash(absolute)}`
          return {moduleKey, moduleId}
        })

        let programPath = nodePath.findParent(path => path.isProgram())

        infos.forEach(({moduleId, moduleKey}) => {
          programPath.unshiftContainer(
            'body',
            t.importDeclaration(
              [
                t.importNamespaceSpecifier(
                  t.identifier(moduleId)
                )
              ],
              t.stringLiteral(moduleKey)
            )
          )
        })

        let moduleObject = '' +
          '{' +
          infos.map(({moduleKey, moduleId}) => `'${moduleKey}': ${moduleId}`).join(',\n') +
          '}'

        nodePath.replaceWithSourceString(req(moduleObject))

        // nodePath.skip()
      }
    }
  }
}

function getPaths (dir, recursive, regexp) {
  let pattern = recursive ? '**/*' : '*'
  let paths = glob.sync(pattern, {
    cwd: dir,
    root: dir,
    nodir: true
  })

  if (regexp) {
    return paths.filter(pathname => regexp.test(pathname))
  }

  return paths
}

function req (modules) {
  return `
  (function () {
    var map = ${modules};
    function req(key) {
      if (!map[key]) {
        throw new Error('Cannot find module "' + key + '".')
      }
      return map[key]
    }
    req.keys = function () {
      return Object.keys(map);
    }
    return req
  })()`
}
