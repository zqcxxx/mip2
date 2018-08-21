import {sayHi} from './utils'
import {sayBye} from '../../common/utils'

import item from './mip-example-item'

export default {
  mounted () {
    sayHi()
    require.ensure(['etpl/src/main'], function (require) {
      let etpl = require('etpl/src/main')
      console.log(etpl.version)
    })

    import('etpl/src/main').then(function (etpl) {
      console.log(etpl.version)
    })
  },
  destroyed () {
    sayBye()
  },
  components: {
    item
  }
}
