'use strict'

const { trim, arrayToMap, singleEdit, twoEdits } = require('../helpers/array')
const { travel } = require('./diff')
const { equal, typeOf } = require('../helpers/equal')
const { lcs } = require('./lcs')
const { diff } = require('./diff')
const { diffObject } = require('./objects')
// const { delta } = require('../delta')
// const { oldArray, newArray } = require('../tests/data/arrayOfIds')

function diffArray (arr1, arr2, path) {

  const events = {
    created: [ ],
    deleted: [ ],
    updated: [ ],
    added: [ ],
    removed: [ ],
    moved: [ ]
  }

  if (arr1 === undefined) {
    events.created.push(['DIFF_CREATE', path, arr2])
    console.log('undefined', events)
    return
    // return delta(events)
  }

  // if (arr1 && typeOf(arr1) !== 'array') {
  //   events.deleted.push(['DIFF_DELETE', path, arr1])
  //   events.created.push(['DIFF_CREATE', path, arr2])
  //   console.log('notarray', events)
  //   return
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
    console.log('sDiff')
    events.updated.push(['DIFF_UPDATE', path, arr2, sDiff])
    console.log('sDiff', events)
    return
    // return delta(events)
  }

  const tDiff = twoEdits(a1, a2, hIdx)
  if (tDiff) {
    console.log('tDiff')
    events.updated.push(['DIFF_UPDATE', path, arr2, tDiff])
    console.log('tDiff', events)
    return
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
        if (typeOf(arr2[i2]) !== 'array' && typeOf(arr2[i2]) !== 'object') {
          events.added.push(['DIFF_INSERT', path, i2, arr2[i2]]) // One element only, no block
          break
        }
        else if (typeOf(arr2[i2]) === 'array') {
          if (arr1[i2] !== undefined) {
            return diffArray (arr1[i2], arr2[i2], path.concat(i2))
          }
          else {
            events.added.push(['DIFF_INSERT', path, i2, arr2[i2]]) // One element only, no block
          }
        }
        else if (typeOf(arr2[i2]) === 'object') {
          if (arr1[i2] !== undefined) {
            return diffObject(arr1[i2], arr2[i2], path.concat(i2))
          }
          else {
            events.added.push(['DIFF_INSERT', path, i2, arr2[i2]]) // One element only, no block
          }
        }
      }
    }
    // else {
    //   const i1 = lcsI1[isLcs2] + hIdx
    //   const i2 = lcsI2[isLcs2] + hIdx
    //
    // }
  }

  console.log(JSON.stringify(events, null, 2))

  // const diffs = [ ...removed, ...moved, ...added ]

  // return delta(diffs)

}

const arr1 = [
  { key: 'k1', arr: ['un', 'deux'] },
  { key: 'k2', arr: ['un', 'deux'] },
  { key: 'k3', arr: ['un', 'deux'] },
  { key: 'k4', arr: ['un', 'deux'] }
]

const arr2 = [
  { key: 'k1', arr: ['un', 'deux'] },
  { key: 'k3', arr: ['un', 'deux'] },
  { key: 'k4', arr: ['un', 'deux'] },
  { key: 'k2', arr: ['un', 'deux'] }
]

// diffArray(arr1, arr2, null)
diffArray('hahaha', 'hovohhoa', [])









// const arr1 = ['The', 'cat', 'in', 'lol', 'lol', 'the', 'hat']
// const arr2 = ['The', 'cat', 'in', 'hah', 'the', 'hat']
//
// array(arr1, arr2)
//
// const te1 = ['The', 'cat', 'in', 'the', 'hat']
// const te2 = ['The', 'ox', 'in', 'the', 'box']

// console.log(trim(arr1, arr2))

module.exports = {
  diffArray
}
