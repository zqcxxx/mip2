/**
 * @file rollup-plugin-node-resolve.js
 * @author clark-t (clarktanglei@163.com)
 */

const path = require('path')
const {expect} = require('chai')
const execa = require('execa')
const fs = require('fs-extra')
const rollup = require('rollup')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const unbundle = require('../../../../../lib/builder/rollup/bundler/plugins/rollup-plugin-unbundle')
const unbundleConfigFactory = require('../../../../../lib/builder/rollup/bundler/config/unbundle')

const projectDir = path.resolve(__dirname, '../../../../mock/amd-externals')
const etplDir = path.resolve(projectDir, 'node_modules/etpl')

describe.only('test rollup-plugin-unbundle', function () {
  let options = {
    filename: path.resolve(projectDir, 'components/mip-example/mip-example.js'),
    outputPath: path.resolve(__dirname, 'dist'),
    dir: projectDir
  }

  before(async function () {
    await fs.remove(options.outputPath)
    if (await fs.exists(etplDir)) {
      return
    }

    process.chdir(projectDir)
    await execa('npm install')
  })

  it('should be external js in node_modules and common', async function () {
    conf = unbundleConfigFactory(options)

    let bundler = await rollup.rollup({
      input: options.filename,
      plugins: [
        unbundle(conf),
        nodeResolve({
          extensions: ['.js', '.vue', '.json']
        }),
        commonjs()
      ]
    })

    let result = await bundler.generate({
      file: path.resolve(options.outputPath, 'mip-example.js'),
      name: 'haha',
      sourcemap: true,
      format: 'amd',
      amd: {
        id: 'test-amd-id'
      }
    })

    expect(result.code).to.include(`define('test-amd-id', ['../../common/utils', 'etpl/src/main']`)
  })

  after(async function () {
    await fs.remove(options.outputPath)
  })
})
