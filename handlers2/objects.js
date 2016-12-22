'use strict'

const { equal, typeOf } = require('../helpers/equal')
const { diff } = require('./diff')

function diffObject (obj1, obj2, path) {
  const events = {
    created: [ ],
    deleted: [ ],
    updated: [ ]
  }

  if (obj1 === undefined) {
    events.created.push(['DIFF_CREATE', path, obj2])
    console.log(events)
    return
    // return delta(events)
  }

  if (obj1 && typeOf(obj1) !== 'object') {
    events.deleted.push(['DIFF_DELETE', path, obj1]) // delete the object
    events.created.push(['DIFF_CREATE', path, obj2])
    console.log(JSON.stringify(events, null, 2))
    return
    // return delta(events)
  }

  const oKeys1 = Object.keys(obj1)
  const oKeys2 = Object.keys(obj2)

  for (let i1 = 0; i1 < oKeys1.length; ++i1) {
    const k1 = oKeys1[i1]

    if(!equal(obj1[k1], obj2[k1])) {
      if (obj2[k1] === undefined) {
        events.deleted.push(['DIFF_DELETE', path.concat(k1), obj1[k1]])
      }
    }
  }

  // oKeys2.forEach(k2 => {
  //   if(!equal(obj1[k2], obj2[k2])) {
  //     if (obj1[k2] === undefined) {
  //       events.created.push(['DIFF_CREATE', path.concat(k2), obj2[k2]])
  //     }
  //     else if (obj1[k2] && typeof obj1[k2] !== 'object') {
  //       events.updated.push(['DIFF_UPDATE', path.concat(k2), obj2[k2]])
  //     }
  //     else {
  //       return diffObject(obj1[k2], obj2[k2], path.concat(k2))
  //     }
  //   }
  // })

  for (let i2 = 0; i2 < oKeys2.length; ++i2) {
    const k2 = oKeys2[i2]

    if(!equal(obj1[k2], obj2[k2])) {
      if (obj1[k2] === undefined) {
        events.created.push(['DIFF_CREATE', path.concat(k2), obj2[k2]])
        break
      }
      if (obj1[k2] && typeof obj1[k2] !== 'object') {
        console.log('obj1.k2', obj1[k2])
        for (let rI; rI < events.deleted; ++rI) {
          const p1 = events.deleted[rI][1]
          console.log('p1', p1)

          console.log('haha', p1)
          console.log('haha', path)

          if (equal(p1, path)) {
            events.updated.push(['DIFF_UPDATE', path.concat(k2), obj2[k2]])
            events.removed.splice(rI, 1)
          }
        }
      }
      else {
        return diffObject(obj1[k2], obj2[k2], path.concat(k2))
      }
    }
  }

  //   if (equal(a1[i1 - hIdx], a2[i2 - hIdx])) {
  //     events.moved.push(['DIFF_MOVE', path, i1, i2, arr2[i2]]) // One element only, no block
  //     events.removed.splice(rI, 1)
  //     isMove = true
  //     break
  //   }
  // }


  // oKeys1.forEach(k1 => {
  //   if(!equal(obj1[k1], obj2[k1])) {
  //     if (obj2[k1] === undefined) {
  //       events.deleted.push(['DIFF_DELETE', path.concat(k1), obj1[k1]])
  //     }
  //   }
  // })

  // oKeys2.forEach(k2 => {
  //   if(!equal(obj1[k2], obj2[k2])) {
  //     if (obj1[k2] === undefined) {
  //       events.created.push(['DIFF_CREATE', path.concat(k2), obj2[k2]])
  //     }
  //     else if (obj1[k2] && typeof obj1[k2] !== 'object') {
  //       events.updated.push(['DIFF_UPDATE', path.concat(k2), obj2[k2]])
  //     }
  //     else {
  //       return diffObject(obj1[k2], obj2[k2], path.concat(k2))
  //     }
  //   }
  // })

  console.log(JSON.stringify(events, null, 2))
  // return delta(events)
}

const obj1 = {
  key1: 'k1',
  key2: 'k2',
  key3: ['k3'],
  key4: { nestedK1: 'nestedK1' }
}

const obj2 = {
  key1: 'kun',
  key3: ['k3', 'k4'],
  key4: { nestedK1: 'nestedK10' },
  key5: 'k5'
}


// diffObject(obj1, obj2, [])

function diffEmptyObject (obj1, obj2, path) {

  if (obj1 === undefined) {
    // return delta(['DIFF_CREATE', path, obj2])
  }

  if (obj1 && typeOf(obj1) !== 'object') {
    // delta('DIFF_DELETE', path, obj1]) // delete the object
    // delta('DIFF_CREATE', path, obj2])
  }

  // delta(['DIFF_DELETE', path, arr1]) // delete the internal keys
}

module.exports = {
  diffObject,
  diffEmptyObject
}
