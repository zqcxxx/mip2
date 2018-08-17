/**
 * @file project-path.js
 * @author clark-t (clarktanglei@163.com)
 */

const path = require('path')

function componentsDir (dir) {
  return path.resolve(dir, 'components')
}

// function possibleComponentPaths(dir, id) {
//     let compDir = componentsDir(dir);
//     return [
//         path.resolve(compDir, id + '.vue'),
//         path.resolve(compDir, id, id + '.vue')
//     ];
// }

// function componentPath (dir, id) {
//   let compDir = componentsDir(dir)
//   return path.resolve(compDir, id, id + '.vue')
// }

function testDir (dir) {
  return path.resolve(dir, 'example')
}

function componentTestDir (dir, component) {
  return path.resolve(dir, component, 'example')
}

// function storeDir (dir) {
//   return path.resolve(dir, 'store')
// }

function isComponentPath (rootDir, pathname) {
  // let basename = path.basename(pathname)
  // 非入口文件的增减则不做任何处理
  if (!/(mip-[\w-]+)\/\1\.(vue|js)$/.test(pathname)) {
    return false
  }

  let basename = path.basename(pathname)

  return path.resolve(
    componentsDir(rootDir),
    path.basename(basename, path.extname(basename)),
    basename
  ) === path.resolve(pathname)
}

function getComponentName (rootDir, pathname) {
  let rootComponentsDir = componentsDir(dir)
  if (path.resolve(pathname).slice(0, rootComponentsDir.length) !== rootComponentsDir) {
    return
  }

  let tmp = pathname
  let dir

  do {
    dir = tmp
    tmp = path.resolve(tmp, '..')
  } while (tmp !== rootComponentsDir)

  return path.basename(dir)
}

function isInComponentDir (rootDir, pathname) {
  return getComponentName(rootDir, pathname) != null
}

// function packageJson (rootDir) {
//   return path.resolve(dir, 'package.json')
// }

// function config (rootDir) {
//   return
// }

module.exports = {
  components: componentsDir,
  getComponentName: getComponentName,
  isInComponentDir: isInComponentDir,
  // componentPath: componentPath,
  componentTestDir: componentTestDir,
  // possibleComponents: possibleComponentPaths,
  test: testDir,
  // store: storeDir,
  isComponentPath
}
