/**
 * @file rollup-plugin-alias.spec.js
 * @author clark-t (clarktanglei@163.com)
 */

const path = require('path')
const rollup = require('rollup')
const aliasConfigFactory = require('../../../../../lib/builder/rollup/bundler/config/alias')
const alias = require('rollup-plugin-alias')
const fs = require('fs-extra')
const {expect} = require('chai')

describe('test rollup-plugin-alias config', function () {
  let options = {
    filename: path.resolve(__dirname, '../../../../mock/fragment-files/alias.js'),
    outputPath: path.resolve(__dirname, 'dist'),
    dir: path.resolve(__dirname, '../../../../mock/fragment-files')
  }

  before(function () {
    return fs.remove(options.outputPath)
  })

  it('should be generate js successfully', async function () {
    let aliasConfig = aliasConfigFactory(options)

    let bundler = await rollup.rollup({
      input: options.filename,
      plugins: [
        alias(aliasConfig)
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

    expect(result.code).to.contain('console.log')
  })

  after(function () {
    return fs.remove(options.outputPath)
  })
})
