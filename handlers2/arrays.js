'use strict'

const { trim, arrayToMap, singleEdit, twoEdits } = require('../helpers/array')
const { travel } = require('./diff')
const { equal, typeOf } = require('../helpers/equal')
const { lcs } = require('./lcs')
const { diff } = require('./diff')
const { diffObject } = require('./objects')
// const { delta } = require('../delta')
// const { oldArray, newArray } = require('../tests/data/arrayOfIds')

function diffArray (arr1, arr2, path, events) {

  if (arr1 === undefined) {
    events.created.push(['DIFF_CREATE', path, arr2])
    return events
    // return delta(events)
  }

  // if (arr1 && typeOf(arr1) !== 'array') {
  //   events.deleted.push(['DIFF_DELETE', path, arr1])
  //   events.created.push(['DIFF_CREATE', path, arr2])
  //   return events
  //   // return delta(events)
  // }

  const trimmed = trim(arr1, arr2)
  const a1 = trimmed.arr1
  const a2 = trimmed.arr2
  const hIdx = trimmed.hIdx
  const tIdx1 = trimmed.tIdx1
  const tIdx2 = trimmed.tIdx2

  const sDiff = singleEdit(a1, a2, hIdx)
  if (sDiff) {
    events.updated.push(['DIFF_UPDATE', path, arr2, sDiff])
    return events
    // return delta(events)
  }

  const tDiff = twoEdits(a1, a2, hIdx)
  if (tDiff) {
    events.updated.push(['DIFF_UPDATE', path, arr2, tDiff])
    return events
    // return delta(events)
  }

  const { lcsI1, lcsI2 } = lcs(a1, a2)

  for (let i1 = hIdx; i1 < tIdx1; ++i1) {
    const isLcs1 = lcsI1.indexOf(i1 - hIdx)
    if (isLcs1 < 0) {
      events.removed.push(['DIFF_REMOVE', path, i1, arr1[i1]]) // One element only, no block
    }
  }

  for (let i2 = hIdx; i2 < tIdx2; ++i2) {
    const isLcs2 = lcsI2.indexOf(i2 - hIdx)
    if (isLcs2 < 0) {
      let isMove = false
      for (let rI = 0; rI < events.removed.length; ++rI) {
        const i1 = events.removed[rI][2]
        if (equal(a1[i1 - hIdx], a2[i2 - hIdx])) {
          events.moved.push(['DIFF_MOVE', path, i1, i2, arr2[i2]]) // One element only, no block
          events.removed.splice(rI, 1)
          isMove = true
          break
        }
      }
      if (!isMove) {
        events.added.push(['DIFF_INSERT', path, i2, arr2[i2]]) // One element only, no block
      }
    }

    if (arr1[i2] && !equal(arr1[i2], arr2[i2])) {
      return diff(arr1[i2], arr2[i2], path.concat(i2), events)
    }
    // else {
    //   const i1 = lcsI1[isLcs2] + hIdx
    //   const i2 = lcsI2[isLcs2] + hIdx
    //
    // }
  }

  return events

  // console.log(JSON.stringify(events, null, 2))

  // const diffs = [ ...removed, ...moved, ...added ]

  // return delta(diffs)

}

module.exports = {
  diffArray
}
