/**
 * @file config.js
 * @author clark-t (clarktanglei@163.com)
 */

const alias = require('rollup-plugin-alias')
const unbundle = require('../plugins/rollup-plugin-unbundle')
const vue = require('rollup-plugin-vue').default
const babel = require('rollup-plugin-babel')
const postcss = require('rollup-plugin-postcss')
const url = require('../plugins/rollup-plugin-url')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

module.exports = function (options) {
  const config = name => {
    let conf = require(`./${name}`)
    if (typeof conf === 'function') {
      return conf(options)
    }

    return conf
  }

  let rollupConfig = {
    input: options.filename,
    plugins: [
      alias(config('alias')),
      unbundle(config('unbundle')),
      vue(config('vue')),
      babel(config('babel')),
      postcss(config('postcss')),
      url(config('url')),
      nodeResolve(config('node-resolve')),
      commonjs()
    ]
  }

  return rollupConfig
}
