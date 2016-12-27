'use strict'

const { equal, typeOf } = require('../helpers/equal')
const { diff } = require('./diff')

function diffObject (o1, o2, path, events) {

  if (o1 === undefined) {
    events.created.push(['DIFF_CREATE', path, o2])
    return events
    // return delta(events)
  }

  if (o1 && typeOf(o1) !== 'object') {
    events.deleted.push(['DIFF_DELETE', path, o1]) // delete the object
    events.created.push(['DIFF_CREATE', path, o2])
    return events
    // return delta(events)
  }

  const oKeys1 = Object.keys(o1)
  const oKeys2 = Object.keys(o2)

  for (let n1 in oKeys1) {
    if (o2[n1] === undefined) {
      // Deletion
      events.deleted.push(['DIFF_DELETE', path, o1[n1]])
    }
  }

  for (let n2 in oKeys2) {
    if (o1[n2] === undefined) {
      // Insertion
      events.created.push(['DIFF_CREATE', path, o2[n2]])
    }

    if (o1[n2] && !equal(o1[n2], o2[n2])) {
      return diff(o1[n2], o2[n2], path.concat(n2), events)
    }
  }

  return events

  // console.log(JSON.stringify(events, null, 2))
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
