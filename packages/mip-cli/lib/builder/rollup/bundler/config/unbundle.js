/**
 * @file unbundle.js
 * @author clark-t (clarktanglei@163.com)
 */

// 只将组件自身相关逻辑打包 包括仅自身依赖的 js css 等
// 对于 common 类的不打包

module.exports = function (options) {
  return {
    include: [
      /node_modules/,
      /common\//
    ],
    exclude: /\.(?!js(on)?$)/,
    baseDir: options.dir
  }
}
