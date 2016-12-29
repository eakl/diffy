'use strict'

const { equal, typeOf } = require('../helpers/equal')
// const { diffArray } = require('./arrays')
// const { diffObject, diffEmptyObject } = require('./objects')
// const { diffPrimitive } = require('./primitives')
const { trim, arrayToMap, singleEdit, twoEdits } = require('../helpers/array')
const { lcs } = require('./lcs')

const before = {
  _id: 'user1',
  group: [
    { _id: 'group1', tags: ['drink', 'food'] },
    { _id: 'group2', tags: ['fun', 'party'] }
  ],
  is_active: true,
  __v: 0
}

const after = {
  _id: 'user1',
  group: [
    { _id: 'group1', tags: ['drink', 'food'] },
    { _id: 'group2', tags: ['fun'] },
    { _id: 'group3', tags: [] }
  ],
  rewards: [],
  is_active: true,
  __v: 1
}

console.log(JSON.stringify(_diff(before, after), null, 2))

function _diff (o1, o2) {
  const events = {
    created: [ ],
    deleted: [ ],
    updated: [ ],
    inserted: [ ],
    removed: [ ],
    moved: [ ]
  }

  diff(o1, o2, null, [], events)

  return events
}




function diff (o1, o2, node, path, events) {
  console.log('o1=', o1)
  console.log('o2=', o2)
  if (!equal(o1, o2)) {
    node = !isNaN(parseInt(node, 10)) ? parseInt(node, 10) : node
    let p = node ? path.concat(node) : path

    if (typeOf(o2) === 'object') {
      diffObject(o1, o2, p, events)
      return
    }

    if (typeOf(o2) === 'array') {
      diffArray(o1, o2, p, events)
      return
    }

    diffValue(o1, o2, p, events)
  }
}


function diffEmptyObject(o1, o2, node, path, events) {

  if (o1 === undefined) {
    events.created.push(['DIFF_CREATE', path, o2])
    return
  }

  if (o1 && typeOf(o1) !== 'object') {
    events.deleted.push(['DIFF_DELETE', path, o1])
    events.created.push(['DIFF_CREATE', path, o2])
    return
  }

}


function diffObject (o1, o2, path, events) {
  if (o1 === undefined) {
    events.created.push(['DIFF_CREATE', path, o2])
    return
  }

  if (o1 && typeOf(o1) !== 'object') {
    events.deleted.push(['DIFF_DELETE', path, o1])
    events.created.push(['DIFF_CREATE', path, o2])
    return
  }

  const oKeys1 = Object.keys(o1)
  const oKeys2 = Object.keys(o2)

  for (let n1 in oKeys1) {
    // Deletion
    const k1 = oKeys1[n1]

    if (o2[k1] === undefined) {
      events.deleted.push(['DIFF_DELETE', path.length === 0 ? path.concat(k1) : path, o1[k1]])
      // Do the concat shorter
    }
  }

  for (let n2 in oKeys2) {
    // Insertion
    const k2 = oKeys2[n2]
    console.log('k2=', k2)

    // console.log('k2=', k2)
    // console.log('o2[k2]=', o2[k2])
    // console.log('o1[k2]=', o1[k2])

    if (o1[k2] === undefined) {
      events.created.push(['DIFF_CREATE', path.length === 0 ? path.concat(k2) : path, o2[k2]])
    }

    if (o1[k2] && !equal(o1[k2], o2[k2])) {
      console.log(o1[k2])
      diff(o1[k2], o2[k2], k2, path, events)
    }
  }
}


function diffArray (a1, a2, path, events) {
  if (a1 === undefined) {
    events.created.push(['DIFF_CREATE', path, a2])
    return
  }

  if (a1 && typeOf(a1) !== 'array') {
    events.deleted.push(['DIFF_DELETE', path, a1])
    events.created.push(['DIFF_CREATE', path, a2])
    return
  }

  const trimmed = trim(a1, a2)
  const { tA1, tA2, hIdx, tIdx1, tIdx2 } = trimmed

  const sDiff = singleEdit(tA1, tA2, hIdx)
  if (sDiff) {
    const [type, i, arr] = sDiff

    if (type === 'DIFF_INSERT') {
      events.inserted.push(['DIFF_INSERT', path, i, arr])
    }
    else if (type === 'DIFF_REMOVE') {
      events.removed.push(['DIFF_REMOVE', path, i, arr])
    }
  }

  const tDiff = twoEdits(tA1, tA2, hIdx)
  if (tDiff) {
    const [ [type1, n1, arr1], , [type2, n2, arr2] ] = tDiff

    if (type1 === 'DIFF_INSERT' && type2 === 'DIFF_INSERT') {
      events.inserted.push(['DIFF_INSERT', path, n1, arr1])
      events.inserted.push(['DIFF_INSERT', path, n2, arr2])
    }
    if (type1 === 'DIFF_REMOVE' && type2 === 'DIFF_REMOVE') {
      events.remove.push(['DIFF_REMOVE', path, n1, arr1])
      events.remove.push(['DIFF_REMOVE', path, n2, arr2])
    }
  }

  const { lcsI1, lcsI2 } = lcs(tA1, tA2)

  for (let i1 = hIdx; i1 < tIdx1; ++i1) {
    const isLcs1 = lcsI1.indexOf(i1 - hIdx)
    if (isLcs1 < 0) {
      events.removed.push(['DIFF_REMOVE', path, i1, a1[i1]]) // One element only, no block
    }
  }

  for (let i2 = hIdx; i2 < tIdx2; ++i2) {
    const isLcs2 = lcsI2.indexOf(i2 - hIdx)
    if (isLcs2 < 0) {
      let isMove = false
      for (let rI = 0; rI < events.removed.length; ++rI) {
        const i1 = events.removed[rI][2]
        if (equal(tA1[i1 - hIdx], tA2[i2 - hIdx])) {
          events.removed.splice(rI, 1)
          events.moved.push(['DIFF_MOVE', path, i1, i2, a2[i2]]) // One element only, no block
          events.removed.splice(rI, 1)
          isMove = true
          break
        }
      }
      if (!isMove) {
        events.inserted.push(['DIFF_INSERT', path, i2, a2[i2]]) // One element only, no block
      }
    }
    // else {
    //   const i1 = lcsI1[isLcs2] + hIdx
    //   const i2 = lcsI2[isLcs2] + hIdx
    //
    // }
  }

  // console.log(JSON.stringify(events, null, 2))

  // const diffs = [ ...removed, ...moved, ...added ]

  // return delta(diffs)

}






function diffValue (v1, v2, path, events) {
  if (v1 === undefined) {
    events.created.push(['DIFF_CREATE', path, v2])
    return
  }

  if ((v1 || v1 === null) && (typeOf(v1) === 'object' || typeOf(v1) === 'array')) {
    events.deleted.push(['DIFF_DELETE', path, v1])
    events.created.push(['DIFF_CREATE', path, v2])
    return
  }

  events.updated.push(['DIFF_UPDATE', path, v2])
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
  { key: 'k2', arr: ['u', 'deux'] }
]
