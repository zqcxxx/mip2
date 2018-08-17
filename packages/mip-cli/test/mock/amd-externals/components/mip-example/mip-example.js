import {sayHi} from './utils'
import {sayBye} from '../../common/utils'
import etpl from 'etpl/src/main'

export default {
  mounted () {
    sayHi()
    console.log(etpl.version)
  },
  destroyed () {
    sayBye()
  }
}
