/**
 * @file helper.js
 * @author clarktanglei@163.com
 */
const {globPify} = require('../utils/helper')

module.exports = {
  async getEntries (rootDir) {
    let globOpts = {
      cwd: rootDir,
      root: rootDir
    }

    let components = await globPify('mip-*/mip-*.@(vue|js)', globOpts)
      .then(arr => arr.filter(name => /(mip-[\w-]+)\/\1\.(vue|js)$/.test(name)))

    if (!components.length) {
      throw Error(`在该路径下找不到 mip 组件入口文件，请检查路径是否规范：\n${rootDir}`)
    }

    return components.reduce((entries, pathname) => {
      let basename = path.basename(pathname, path.extname(pathname))
      entries[`${basename}/${basename}`] = path.resolve(rootDir, pathname)
      return entries
    }, {})
  }
}
