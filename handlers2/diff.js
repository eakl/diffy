'use strict'

const { isArray } = require('../helpers/array')
const { isObject } = require('../helpers/object')
const { isString, isBool, isNum } = require('../helpers/primitive')
const { equal, typeOf } = require('../helpers/equal')
const { diffArray } = require('./arrays')
const { diffObject, diffEmptyObject } = require('./objects')

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

const events = {
  created: [ ],
  deleted: [ ],
  updated: [ ],
  added: [ ],
  removed: [ ],
  moved: [ ]
}

diff(before, after, null, [], events)

function diff (o1, o2, node, path, events) {

  const p = node ? path.concat(node) : path

  if (typeOf(o2) === 'object') {
    const oKeys1 = Object.keys(o1)
    const oKeys2 = Object.keys(o2)

    if (oKeys2.length === 0) {
      if (!equal(o1, o2)) {
        return diffEmptyObject(o1, o2, p.length === 0 ? p.concat(node) : p)
      }
    }
    else {

      for (let n1 in oKeys1) {
        if (o2[n1] === undefined) {
          // Deletion
          return diffObject(o1[n1], o2[n1], p.length === 0 ? p.concat(n1) : p, events)
        }
      }

      for (let n2 in oKeys2) {
        if (o1[n2] === undefined) {
          // Insertion
          return diffObject(o1[n2], o2[n2], p.length === 0 ? p.concat(n2) : p, events)
        }
      }




      return oKeys.map(n => {
        if (equal(o2[oKeys[n]], o1[oKeys[n]]))


      })
    }
  }

  if (typeOf(o2) === 'array') {
    if (!equal(o1, o2)) {
      node = !isNaN(parseInt(node, 10)) ? parseInt(node, 10) : node
      n = !isNaN(parseInt(n, 10)) ? parseInt(n, 10) : n
      return diffArray(o1, o2, p.length === 0 ? p.concat(node) : p)
    }
    return false
  }


      return false
    }
    else {
      return oKeys.map(n => {
        if (o1[n]) {
          return travel(o1[n], o2[n], n, p)
        }
        else {
          n = !isNaN(parseInt(n, 10)) ? parseInt(n, 10) : n
          return diffObject(o1, o2, p.length === 0 ? p.concat(n) : p)
        }
      })
    }
  }

  if (!equal(o2, o1)) {
    return diff(o2, o1, p.length === 0 ? p.concat(node) : p, 'primitive')
  }
  else {
    return false
  }
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

diff(arr1, arr2, null, [])

function travel (o, node, key, res) {
  if (typeof o === 'object' && o !== null) {
    const k = node ? key.concat(node) : key
    const oKeys = Object.keys(o)

    if (oKeys.length === 0) {
      // Handle empty array
      const k = key.concat(node).join('.')
      res[k] = Array.isArray(o) ? [] : {}
      return res
    }
    else {
      return oKeys.map(x => travel(o[x], x, k, res))
    }
  }
  const k = key.concat(node).join('.')
  res[k] = o
  return res
}

// let res = { }
// travel(after, null, [], res)
// console.log(res)

module.exports = {
  travel
}
