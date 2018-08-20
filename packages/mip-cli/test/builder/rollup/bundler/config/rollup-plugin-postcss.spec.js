/**
 * @file rollup-plugin-postcss.spec.js
 * @author clark-t (clarktanglei@163.com)
 */

const path = require('path')
const rollup = require('rollup')
const postcssConfigFactory = require('../../../../../lib/builder/rollup/bundler/config/postcss')
const postcss = require('rollup-plugin-postcss')
const fs = require('fs-extra')
const {expect} = require('chai')

describe.only('test rollup postcss plugin config', function () {
  let common = {
    outputPath: path.resolve(__dirname, 'dist'),
    asset: 'https://www.baidu.com/',
    fs: fs
  }

  let projectDir = path.resolve(__dirname, '../../../../mock/fragment-files')

  before(function () {
    return fs.remove(common.outputPath)
  })

  it('should be generate css successfully', async function () {
    let options = Object.assign({
      filename: path.resolve(projectDir, 'index.less')
    }, common)

    let postcssConfig = postcssConfigFactory(options)

    let bundler = await rollup.rollup({
      input: options.filename,
      plugins: [
        postcss(postcssConfig)
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

    expect(result.code).to.contain('.second')
    expect(result.code).to.not.contain('@import')
    expect(result.code).to.contain('https://www.baidu.com/mip-logo')
    expect(result.code).to.contain('-webkit-box')
  })

  it('should be generate mixed css successfully', async function () {
    let options = Object.assign({
      filename: path.resolve(projectDir, 'mix.less')
    }, common)

    let postcssConfig = postcssConfigFactory(options)

    let bundler = await rollup.rollup({
      input: options.filename,
      plugins: [
        postcss(postcssConfig)
      ]
    })

    let result = await bundler.generate({
      file: path.resolve(options.outputPath, 'mix.js'),
      name: 'haha',
      sourcemap: true,
      format: 'amd',
      amd: {
        id: 'test-amd-id'
      }
    })

    expect(result.code).to.contain('.simple')
    expect(result.code).to.contain('.index .haha')
    expect(result.code).to.not.contain('@import')
    expect(result.code).to.contain('https://www.baidu.com/mip-logo')
    expect(result.code).to.contain('-webkit-box')
  })

  after(function () {
    return fs.remove(common.outputPath)
  })
})
