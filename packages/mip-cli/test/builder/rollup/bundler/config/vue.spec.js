/**
 * @file rollup-plugin-vue.spec.js
 * @author clark-t (clarktanglei@163.com)
 */

const path = require('path')
const rollup = require('rollup')
const vueConfigFactory = require('../../../../../lib/builder/rollup/bundler/config/vue')
// const vue = require('rollup-plugin-vue').default
// const nodeResolve = require('rollup-plugin-node-resolve')
// const commonjs = require('rollup-plugin-node-commonjs')
// const url = require('../../../../../lib/builder/rollup/bundler/plugins/rollup-plugin-url')
const urlConfigFactory = require('../../../../../lib/builder/rollup/bundler/config/url')
const fs = require('fs-extra')
const {expect} = require('chai')

describe('test rollup vue plugin config', function () {
  let commonOptions = {
    dir: path.resolve(__dirname, '../../../../mock/fragment-files'),
    filename: path.resolve(__dirname, '../../../../mock/fragment-files/simple.vue'),
    outputPath: path.resolve(__dirname, 'dist'),
    asset: 'https://www.baidu.com/'
  }

  before(function () {
    return fs.remove(commonOptions.outputPath)
  })

  it('should be generate vue plugin successfully', async function () {
    let options = Object.assign({}, commonOptions, {NODE_ENV: 'production'})
    // let vueConfig = vueConfigFactory(options)
    // let urlConfig = urlConfigFactory(options)

    let bundler = await rollup.rollup({
      input: options.filename,
      plugins: [
        vueConfigFactory(options),
        urlConfigFactory(options)
      ]
    })

    let result = await bundler.generate({
      file: path.resolve(options.outputPath, 'index.js'),
      name: 'haha',
      sourcemap: true,
      format: 'amd',
      amd: {
        id: 'test-amd-id'
      }
    })

    expect(result.code).to.contain('.simple')
    expect(result.code).to.contain('.index .haha')
    expect(result.code).to.contain('.second')
    expect(result.code).to.not.contain('@import')
    expect(result.code).to.contain('https://www.baidu.com/assets/mip-logo')
    expect(result.code).to.contain('-webkit-box')
  })

  it('should be generate vue plugin successfully in development mode', async function () {
    let options = Object.assign({}, commonOptions, {NODE_ENV: 'development'})
    // let vueConfig = vueConfigFactory(options)
    // let urlConfig = urlConfigFactory(options)

    let bundler = await rollup.rollup({
      input: options.filename,
      plugins: [
        vueConfigFactory(options),
        urlConfigFactory(options)
      ]
    })

    let result = await bundler.generate({
      file: path.resolve(options.outputPath, 'index.js'),
      name: 'haha',
      sourcemap: true,
      format: 'amd',
      amd: {
        id: 'test-amd-id'
      }
    })

    expect(result.code).to.contain('.simple')
    expect(result.code).to.contain('.index .haha[data-v-')
    expect(result.code).to.contain('.second')
    // expect(result.code).to.not.contain('@import')
    expect(result.code).to.contain('/static/mip-logo.png')
    expect(result.code).to.contain('-webkit-box')
  })

  after(function () {
    return fs.remove(commonOptions.outputPath)
  })
})
