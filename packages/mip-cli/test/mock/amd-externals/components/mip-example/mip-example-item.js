import {sayHi} from './utils'
import {sayBye} from '../../common/utils'
// import etpl from 'etpl/src/main'

export default {
  mounted () {
    sayHi()
    // console.log(etpl.version)
    console.log('this is mip example item')
  },
  destroyed () {
    sayBye()
  }
}
