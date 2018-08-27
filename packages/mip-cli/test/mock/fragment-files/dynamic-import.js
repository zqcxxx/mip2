import {second} from './sub/second'

function hehe () {
  import('./sub/utils').then(utils => {
    console.log(utils)
  })
}

haha()
