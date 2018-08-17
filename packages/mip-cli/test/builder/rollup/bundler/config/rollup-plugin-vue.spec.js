/**
 * @file rollup-plugin-vue.spec.js
 * @author clark-t (clarktanglei@163.com)
 */

const path = require('path')
const rollup = require('rollup')
const vueConfigFactory = require('../../../../../lib/builder/rollup/bundler/config/vue')
const vue = require('rollup-plugin-vue').default
const fs = require('fs-extra')
const {expect} = require('chai')

describe('test rollup vue plugin config', function () {
  let options = {
    filename: path.resolve(__dirname, '../../../../mock/fragment-files/simple.vue'),
    outputPath: path.resolve(__dirname, 'dist'),
    asset: 'https://www.baidu.com/',
    fs: fs,
    NODE_ENV: 'production'
  }

  before(function () {
    return fs.remove(options.outputPath)
  })

  it('should be generate css successfully', async function () {
    let vueConfig = vueConfigFactory(options)

    let bundler = await rollup.rollup({
      input: options.filename,
      plugins: [
        vue(vueConfig)
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
    expect(result.code).to.contain('https://www.baidu.com/mip-logo')
    expect(result.code).to.contain('-webkit-box')
  })

  after(function () {
    return fs.remove(options.outputPath)
  })
})
