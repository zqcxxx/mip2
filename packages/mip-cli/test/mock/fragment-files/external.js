
import get from '@babel/runtime/helpers/esm/get'
import {sayHi} from './utils'

export default {
  get: get,
  fn: function () {
    sayHi()
  }
}
