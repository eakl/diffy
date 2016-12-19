'use strict'

const { isArray } = require('../helpers/array')
const { isObject } = require('../helpers/object')
const { isString, isBool, isNum } = require('../helpers/primitive')
const { equal, typeOf } = require('../helpers/equal')
// const { diffArray } = require('./arrays')
// const { diffObject, diffEmptyObject } = require('./objects')

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


function reach (obj, path, i) {
  if (i < path.length) {
    return reach(obj[path[i]], path, ++i)
  }
  return obj
}

// console.log(reach(after, [ 'haha', 'hoho' ], 0))

function diff2 (o2, o1, path, type) {

  // switch (type) {
  //   case 'array':
  //     return diffArray(o1, o2, path)
  //   case 'empty_object':
  //     return diffEmptyObject(o1, o2, path)
  //   case 'object':
  //     return diffObject(o1, o2, path)
  //   case 'primitive':
  //     return diffPrimitive(o1, o2, path)
  // }

  const data2 = reach(after, path, 0)
  const data1 = reach(before, path, 0)
  console.log(path)
  console.log(data2)
  console.log(data1)


}


function diff (o1, o2, node, path) {
  node = !isNaN(parseInt(node, 10)) ? parseInt(node, 10) : node
  const p = node ? path.concat(node) : path

  if (typeOf(o2) === 'array') {
    if (!equal(o1, o2)) {
      // return diffArray(o1, o2, p.length === 0 ? p.concat(node) : p)
    }
  }
  if (typeOf(o2) === 'object') {
    const oKeys = Object.keys(o2)

    if (oKeys.length === 0) {
      // Handle empty array
      if (!equal(o1, o2)) {
        // return diffEmptyObject(o1, o2, p.length === 0 ? p.concat(node) : p)
      }
    }
    else {
      return oKeys.map(n => {
        if (o1[n]) {
          return travel(o1[n], o2[n], n, p)
        }
        else {
          n = !isNaN(parseInt(n, 10)) ? parseInt(n, 10) : n
          return diff(o2, o1, p.length === 0 ? p.concat(n) : p, 'object')
        }
      })
    }
  }
  if (!equal(o2, o1)) {
    return diff(o2, o1, p.length === 0 ? p.concat(node) : p, 'primitive')
  }
}





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

let res = { }
travel(before, null, [], res)
console.log(res)

module.exports = {
  travel
}
