/**
 * @file babel.js
 * @author clark-t (clarktanglei@163.com)
 */
const {resolveModule} = require('../../../../utils/helper')
// const {isComponentPath}

module.exports = function (options = {}) {
  let config = {
    exclude: 'node_modules/**',
    babelrc: false,
    runtimeHelpers: true,
    presets: [
      [
        require.resolve('babel-preset-env'),
        {
          modules: false,
          targets: {
            browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
          }
        }
      ],
      require.resolve('babel-preset-stage-2')
    ],
    plugins: [
      [
        require.resolve('babel-plugin-transform-runtime'),
        {
          helpers: true,
          polyfill: true,
          regenerator: true,
          moduleName: resolveModule('babel-runtime')
        }
      ],
      [
        require.resolve('../plugins/babel-plugin-child-component'),
        {
          basedir: options.dir
        }
      ]
    ]
  }

  if (typeof options.proxy === 'object' && Object.keys(options.proxy).length > 0) {
    config.plugins.push([
      require.resolve('../plugins/babel-plugin-proxy'),
      options.proxy
    ])
  }

  return config
}
