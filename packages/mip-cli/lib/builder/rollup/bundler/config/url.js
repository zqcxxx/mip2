/**
 * @file url.js
 * @author clark-t (clarktanglei@163.com)
 */
const sharedAsset = require('./shared/asset')

module.exports = function (options = {}) {
  let assetOpts = sharedAsset(options)

  return {
    include: [
      '**/*.png',
      '**/*.jpg',
      '**/*.gif',
      '**/*.otf',
      '**/*.ttf',
      '**/*.eot',
      '**/*.svg',
      '**/*.woff',
      '**/*.woff2'
    ],
    limit: 2 * 1024,
    emitFiles: true,
    load (...args) {
      assetOpts.load(...args)
      return assetOpts
    }
  }
}
