'use strict'

const { isString, isBool, isNum } = require('./primitive')
const { isObject } = require('./object')
const { equal } = require('./equal')

const isArray = Array.isArray

// Trim common head
function headIdx (arr1, arr2) {
  const len1 = arr1.length
  const len2 = arr2.length
  const nullCase = !arr1 || !arr2 || len1 === 0 || len2 === 0
  let i = 0

  // Quick check for reducing unecessary computation
  if (nullCase || !equal(arr1[0], arr2[0])) {
    return 0
  }

  while (i < len1 && i < len2 && equal(arr1[i], arr2[i])) {
    i += 1
  }

  return i - 1
}

// Trim common tail
function tailIdx (arr1, arr2) {
  const len1 = arr1.length
  const len2 = arr2.length
  const nullCase = !arr1 || !arr2 || len1 === 0 || len2 === 0
  let i = 0

  // Quick check for reducing unecessary computation
  if (nullCase || !equal(arr1[len1 - 1], arr2[len2 - 1])) {
    return 0
  }

  while (i < len1 - 1 && i < len2 - 1 && equal(arr1[len1 - 1 - i], arr2[len2 - 1 - i])) {
    i += 1
  }

  return i
}

// Trim the array by removing common head and tail
function trim (arr1, arr2) {
  const hIdx = headIdx(arr1, arr2) + 1
  const tIdx1 = arr1.length - tailIdx(arr1, arr2)
  const tIdx2 = arr2.length - tailIdx(arr1, arr2)

  return {
    tA1: arr1.slice(hIdx, tIdx1),
    tA2: arr2.slice(hIdx, tIdx2),
    hIdx: hIdx,
    tIdx1: tIdx1,
    tIdx2: tIdx2
  }
}

// Does the array a set of unique primitives? (Doesn't work on objects)
function isUnique (arr) {
  const set = new Set(arr)
  return (arr.length === set.size)
}

// Return the index of the first element of the sub array contained in the master array
function arrayCountainSubIdx(master, sub, iM, iS, iFound, next) {
  if (iS < sub.length) {
    if (next) {
      return arrayCountainSubIdx(master, sub, iM + 1, iS + 1, iFound, equal(sub[iS], master[iM]))
    }
    const i = master.indexOf(sub[iS], iM)

    if (i !== -1) {
      iFound += i
      return arrayCountainSubIdx(master, sub, iFound + 1, iS + 1, iFound, true)
    }
  }

  return next ? iFound : -1
}

// Convert an array to an HashMap
function arrayToMap2 (arr, key = null) {
  return arr.reduce((acc, x, i) => {
    if (typeof x === 'object' && key && x[key]) {
      acc[x[key]] = x
    }
    else {
      acc[i] = x
    }
    return acc
  }, [ ])
}

function arrayToMap (arr) {
  return arr.reduce((acc, x, i) => {
    acc[i] = x
    return acc
  }, { })
}

const l = [{lol: 'a'},{lol: 'b'},{lol: 'c'},{lol: 'd'}]
const ll = arrayToMap(l, 'lol')
console.log(ll['b'])

// Get object's hashKey
function objectHash (obj, key = '_id') {
  if (!obj || !isObject(obj)) {
    return new Error('Invalid Object')
  }
  // Try to hash item by provided key
  if (isString(key) && obj[key]) {
    return obj[key]
  }
  // Otherwise, hash item by position
  else if (isNum(key)) {
    return key
  }
  else {
    return new Error('Invalid key')
  }
}

const hash = { cache1: [ ], cache2: [ ] }

const test = [
  { key: { cle: ['first', 'second'] } },
  { key: [ 'third', 'fourth' ] },
  { key: { card: { color: 'blue' } } }
]

const test2 = [
  { key: { cle: ['first', 'second'] } },
  { key: [ 'third', 'fifth' ] },
  { key: { card: { color: 'red' } } }
]

// console.log(compareArrayElem (test, test2, 2, 2, hash))




// function compareElemByHash (arr1, arr2, i1, i2, hash) {
//   hash.cache1 = hash.cache1 || [ ]
//   hash.cache2 = hash.cache2 || [ ]
//   const val1 = arr1[i1]
//   const val2 = arr2[i2]
//
//   let hash1
//   let hash2
//
//
//   // Hash 1st Element
//   if (k1) {
//     // Position hash
//     if (isNum(k1)) {
//       console.log('k1 is num')
//       if (hash.cache1[k1]) {
//         console.log('k1 use cache')
//         hash1 = hash.cache1[k1]
//       }
//       else {
//         console.log('k1 creates hash')
//         hash1 = hash.cache1[k1] = objectHash(arr1[k1], k1)
//       }
//     }
//     // Hash key
//     else if (isString(k1)) {
//       console.log('k1 is string')
//       hash1 = objectHash(arr1[k1], k1)
//       console.log(hash1)
//     }
//     else {
//       return false
//     }
//   }
//
//   // Hash 2nd Element
//   if (k2) {
//     // Position hash
//     if (isNum(k2)) {
//       if (hash.cache2[k2]) {
//         hash2 = hash.cache2[k2]
//       }
//       else {
//         hash2 = hash.cache2[k2] = objectHash(arr2[k2], k2)
//       }
//     }
//     // Hash key
//     else if (isString(k2)) {
//       hash2 = objectHash(arr1[k2], k2)
//     }
//     else {
//       return false
//     }
//   }
//
//   if (!hash1 || !hash2) {
//     return false
//   }
//
//   return hash1 === hash2
// }

// Detect single edit in one array (INSERTION/DELETION)
function singleEdit (arr1, arr2, i) {
  const len1 = arr1.length
  const len2 = arr2.length

  if (len1 === 0 && len2 !== 0) {
    return ['DIFF_INSERT', i, arr2]
  }
  else if (len1 !== 0 && len2 === 0) {
    return ['DIFF_REMOVE', i, arr1]
  }
  else {
    return false
  }
}

// Detect two simple edits on the edges in the same array (INSERTION/DELETION)
function twoEdits (arr1, arr2, iH) {
  const long = arr1.length > arr2.length ? arr1 : arr2
  const short = arr1.length > arr2.length ? arr2 : arr1
  const i = arrayCountainSubIdx(long, short, 0, 0, 0, false)

  const edit1 = [ ...long.slice(0, i) ]
  const edit2 = [ ...long.slice(i + short.length) ]
  const common = [ ...short ]

  if (i !== -1) {
    const diff = [
      ['DIFF_INSERT', iH, edit1],
      ['DIFF_EQUAL', null, common],
      ['DIFF_INSERT', iH + short.length, edit2]
    ]

    // Swap insertions for deletions if diff is reversed.
    if (arr1.length > arr2.length) {
      diff[0][0] = diff[2][0] = 'DIFF_REMOVE'
      diff[2][1] += edit1.length // Change the index when it's a delete
    }

    return diff
  }
  else {
    return false
  }
}

// CHECK the 'i' between insertion and deletion
// ['O','b','c','d','O']
// ['O','a','x','b','c','d','e','z','O']
console.log(twoEdits(['b','c','d', 'e'], ['a','x', 'v','b','c','d','e','z', 'h'], 2))
// console.log(twoEdits(['b','c','d'], ['a','x','b','c','d','e','z'], 1))
// console.log(twoEdits(['a','x','b','c','d','e','z'], ['b','c','d'], 1))

module.exports = {
  isArray,
  objectHash,
  isUnique,
  arrayToMap,
  singleEdit,
  trim,
  twoEdits,
  arrayCountainSubIdx
}
