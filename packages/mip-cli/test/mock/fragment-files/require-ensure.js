function haha () {
  require.ensure(['./sub/second'], function (require) {
    let second = require('./sub/second')
    let third = require('./sub/third')
    console.log(second)
    console.log(third)

    import('./sub/utils').then(utils => {
      console.log(utils)
    })
  })
}

haha()
