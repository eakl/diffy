'use strict'

const { trim, arrayToMap, singleEdit, twoEdits } = require('../helpers/array')
const { travel } = require('./travel')
const { equal } = require('../helpers/equal')
const { lcs } = require('./lcs')
const { delta } = require('../delta')
// const { oldArray, newArray } = require('../tests/data/arrayOfIds')

function diffArray (arr1, arr2, path) {

  if (arr1 === undefined) {
    return delta('DIFF_CREATE', arr2, path)
  }

  if (arr1 && typeOf(arr1) !== 'array') {
    delta('DIFF_DELETE', arr1, path)
    delta('DIFF_CREATE', arr2, path)
  }

  const trimmed = trim(arr1, arr2)
  const a1 = trimmed.arr1
  const a2 = trimmed.arr2
  const hIdx = trimmed.hIdx
  const tIdx1 = trimmed.tIdx1
  const tIdx2 = trimmed.tIdx2

  const sDiff = singleEdit(a1, a2, hIdx)
  if (sDiff) {
    console.log('sDiff')
    return delta('DIFF_MODIF', arr2, path, sDiff)
  }

  const tDiff = twoEdits(a1, a2, hIdx)
  if (tDiff) {
    console.log('tDiff')
    return delta('DIFF_MODIF', arr2, path, tDiff)
  }

  const removed = [ ]
  const added = [ ]
  const moved = [ ]
  const { lcsI1, lcsI2 } = lcs(a1, a2)

  for (let i1 = hIdx; i1 < tIdx1; ++i1) {
    const isLcs1 = lcsI1.indexOf(i1 - hIdx)
    if (isLcs1 < 0) {
      removed.push(['DIFF_REMOVE', i1, arr1[i1]]) // One element only, no block
    }
  }

  for (let i2 = hIdx; i2 < tIdx2; ++i2) {
    const isLcs2 = lcsI2.indexOf(i2 - hIdx)
    if (isLcs2 < 0) {
      let isMove = false
      for (let rI = 0; rI < removed.length; ++rI) {
        const i1 = removed[rI][1]
        if (equal(a1[i1 - hIdx], a2[i2 - hIdx])) {
          moved.push(['DIFF_MOVE', i1, i2, arr2[i2]]) // One element only, no block
          removed.splice(rI, 1)
          isMove = true
          break
        }
      }
      if (!isMove) {
        added.push(['DIFF_INSERT', i2, arr2[i2]]) // One element only, no block
      }
    }
    else {
      const i1 = lcsI1[isLcs2] + hIdx
      const i2 = lcsI2[isLcs2] + hIdx

      if

      return travel(arr1[i1], arr2[i2], null, path)
    }
  }

  return delta(removed, moved, added)
}

// array('hgzhaha', 'hohahz')









const arr1 = ['The', 'cat', 'in', 'lol', 'lol', 'the', 'hat']
const arr2 = ['The', 'cat', 'in', 'hah', 'the', 'hat']

// array(arr1, arr2)

const te1 = ['The', 'cat', 'in', 'the', 'hat']
const te2 = ['The', 'ox', 'in', 'the', 'box']

// console.log(trim(arr1, arr2))

module.exports = {
  diffArray
}
