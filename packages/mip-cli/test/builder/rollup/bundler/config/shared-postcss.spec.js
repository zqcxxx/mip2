/**
 * @file shared-postcss.spec.js
 * @author clark-t (clarktanglei@163.com)
 */
const sharedPostcssConfig = require('../../../../../lib/builder/rollup/bundler/config/shared/postcss')
const postcss = require('postcss')
const path = require('path')
const fs = require('fs-extra')
const {expect} = require('chai')
const glob = require('glob')

describe('test shared postcss plugins config', function () {
  let options = {
    filename: path.resolve(__dirname, '../../../../mock/fragment-files/index.less'),
    outputPath: path.resolve(__dirname, 'dist'),
    asset: 'https://www.baidu.com/mip-logo-b1e667b6.png',
    fs: fs
  }

  before(function () {
    return fs.remove(options.outputPath)
  })

  it('autoprefixer and url should be ok', function () {
    let plugins = sharedPostcssConfig.plugins(options)
    let file = fs.readFileSync(options.filename, 'utf-8')
    let processor = postcss()
    plugins.forEach(plugin => processor.use(plugin))

    return processor.process(file, {
        from: options.filename,
        to: path.resolve(options.outputPath, 'hehe.css')
      })
      .then(result => {
        expect(result.css).to.include('-webkit-box')
        expect(result.css).to.include('https://www.baidu.com/')

        let distAseets = glob.sync('assets/mip-logo-*.png', {
          root: options.outputPath,
          cwd: options.outputPath
        })

        expect(distAseets.length).to.be.equal(1)

        let imgMessage = result.messages.filter(
          obj => path.resolve(obj.parent) === options.filename && /\.png$/.test(obj.file)
        )

        expect(imgMessage.length).to.be.equal(1)

        imgMessage.forEach(obj => {
          let originalBasename = path.basename(obj.file, '.png')
          let distBasename = path.basename(distAseets[0], '.png')
          expect(distBasename).to.contain(originalBasename)
        })
      })
  })

  after(function () {
    return fs.remove(options.outputPath)
  })
})
