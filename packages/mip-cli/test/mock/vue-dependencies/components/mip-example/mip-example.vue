<template>
  <div>{{ name }}</div>
</template>

<script>

import {sayHi} from './utils'
import {sayBye} from '../../common/utils'
import '../../common/common.less'

export default {
  data () {
    return {
      name: 'haha'
    }
  },
  mounted () {
    sayHi()

    import('etpl/src/main').then(function (etpl) {
      console.log(etpl.version)
    })
  },
  destroyed () {
    sayBye()
  }
}

</script>
