/**
 * @file node-resolve.js
 * @author clark-t(clarktanglei@163.com)
 */

nodeResolve = require('rollup-plugin-node-resolve')

module.exports = nodeResolve({
  extensions: ['.js', '.json', '.vue']
})
