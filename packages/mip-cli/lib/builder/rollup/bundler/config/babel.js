/**
 * @file babel.js
 * @author clark-t (clarktanglei@163.com)
 */

const babel = require('rollup-plugin-babel')
const {resolveModule} = require('../../../../utils/helper')

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
      ],
      [
        require.resolve('../plugins/babel-plugin-component'),
        {
          basedir: options.dir
        }
      ],
      // require.resolve('../plugins/babel-plugin-require-ensure'),
      require.resolve('../plugins/babel-plugin-require-context'),
      require.resolve('../plugins/babel-plugin-dynamic-dependencies')
    ]
  }

  if (typeof options.proxy === 'object' && Object.keys(options.proxy).length > 0) {
    config.plugins.push([
      require.resolve('../plugins/babel-plugin-proxy'),
      options.proxy
    ])
  }

  return babel(config)
}
