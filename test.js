'use strict'

function test (arr1, arr2) {
  console.log('arr1=', arr1)
  console.log('arr2=', arr2)
}

let arr

test(['e'], [])
test(['e'], '')
test(arr, ['e'])
test(null, ['e'])
