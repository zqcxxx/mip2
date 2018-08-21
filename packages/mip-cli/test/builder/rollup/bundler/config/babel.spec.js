/**
 * @file rollup-plugin-alias.spec.js
 * @author clark-t (clarktanglei@163.com)
 */

const path = require('path')
const rollup = require('rollup')
const babelConfigFactory = require('../../../../../lib/builder/rollup/bundler/config/babel')
const unbundleConfigFactory = require('../../../../../lib/builder/rollup/bundler/config/unbundle')
const babel = require('rollup-plugin-babel')
const unbundle = require('../../../../../lib/builder/rollup/bundler/plugins/rollup-plugin-unbundle')
const fs = require('fs-extra')
const {expect} = require('chai')

describe.only('test rollup-plugin-alias config', function () {
  let commonOptions = {
    outputPath: path.resolve(__dirname, 'dist')
  }

  before(function () {
    return fs.remove(commonOptions.outputPath)
  })

  it('should be generate es5 js successfully', async function () {
    let options = Object.assign({}, commonOptions, {
      filename: path.resolve(__dirname, '../../../../mock/fragment-files/es7.js'),
      dir: path.resolve(__dirname, '../../../../mock/fragment-files')
    })

    let bundler = await rollup.rollup({
      input: options.filename,
      plugins: [
        unbundle(unbundleConfigFactory(options)),
        babel(babelConfigFactory({
          proxy: {
            'https://path/to/sth': 'abc'
          },
          dir: options.dir
        }))
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

    console.log(result.code)
    // expect(result.code).to.contain('console.log')
  })

  it('should be generate injected child component js successfully', async function () {
    let options = Object.assign({}, commonOptions, {
      filename: path.resolve(__dirname, '../../../../mock/amd-externals/components/mip-example/mip-example.js'),
      dir: path.resolve(__dirname, '../../../../mock/amd-externals')
    })

    options.baseDir = options.dir

    let bundler = await rollup.rollup({
      input: options.filename,
      plugins: [
        unbundle(unbundleConfigFactory(options)),
        babel(babelConfigFactory({
          proxy: {
            'https://path/to/sth': 'abc'
          },
          dir: options.dir
        }))
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

    expect(result.code).to.contain('this is mip example item')
    expect(result.code).to.contain('mip-example-item')
  })

  after(function () {
    return fs.remove(commonOptions.outputPath)
  })
})
