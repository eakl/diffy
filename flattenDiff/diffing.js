'use strict'

// =========
// Test Data
// =========

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

// ==============
// Core functions
// ==============

// Flattener
function flatten (obj) {
  const res = new Map()
  _flatten(null, obj, res)
  return res
}

function _flatten (key, obj, res) {
  if (typeof obj === 'object') {
    const k = key ? `${key}.` : ''
    const oKeys = Object.keys(obj)

    if (oKeys.length === 0) {
      // Handle empty array
      return res.set(key, Array.isArray(obj) ? [] : {})
    }
    else {
      return oKeys.map(x => _flatten(`${k}${x}`, obj[x], res))
    }
  }
  res.set(key, obj)
}

// Diffing
function diffing (before, after) {
  const r = new Map([ ['i', []], ['u', []], ['d', []] ])
  const flatBefore = flatten(before)
  const flatAfter = flatten(after)

  flatAfter.forEach((val, key) => {
    const hasKey = flatBefore.has(key)

    if (!hasKey) {
      // Insertion
      const event = { type: 'i', key: key, value: val }
      r.set('i', r.get('i').concat(event))
    }
  })

  flatBefore.forEach((val, key) => {
    const hasKey = flatAfter.has(key)
    const hasChanged = flatAfter.get(key) !== val

    // Update
    if (hasKey) {
      if (hasChanged) {
        const event = { type: 'u', key: key, value: flatAfter.get(key) }
        r.set('u', r.get('u').concat(event))
      }
    }
    else {
      // Deletion
      const event = { type: 'd', key: key, value: val }
      r.set('d', r.get('d').concat(event))
    }
  })

  return r
}

const arr1 = ['google', 'apple', 'facebook', 'amazon', 'microsoft']
const arr2 = ['uber', 'google', 'apple', 'facebook', 'amazon', 'microsoft']
// const arr2 = ['google', 'microsoft', 'apple', 'airbnb', 'amazon', 'uber']


console.log(flatten(arr1))
console.log(flatten(arr2))
console.log(diffing(arr1, arr2))

// Event creator
function event (before, after) {
  const m = new Map([ ['c', []], ['a', []], ['u', []], ['d', []], ['r', []] ])

  const flatBefore = flatten(before)
  const flatAfter = flatten(after)
  const diffMap = diffing(before, after)

  // Create vs. Add
  diffMap.get('i').forEach(x => {
    const diffKey = x.key.split('.')
    const nodes = getNode(diffKey, flatBefore)

    const parts = nodes.map(x => x.split('.'))
    const max = parts.reduce((p, x) => {
      return p > x ? p : x
    })

    const add = !isNaN(parseInt(max.pop(), 10)) ? true : false

    if (add) {
      const event = { type: 'a', node: max.join('.') , key: x.key, value: x.value }
      m.set('a', m.get('a').concat(event))
    }
    else {
      const event = { type: 'c', node: max.join('.') , key: x.key, value: x.value }
      m.set('c', m.get('c').concat(event))
    }
  })

  // Delete vs. Remove
  diffMap.get('d').forEach(x => {
    const diffKey = x.key.split('.')
    const nodes = getNode(diffKey, flatAfter)

    const parts = nodes.map(x => x.split('.'))
    const max = parts.reduce((p, x) => {
      return p > x ? p : x
    })

    const remove = !isNaN(parseInt(max.pop(), 10)) ? true : false

    if (remove) {
      const event = { type: 'r', node: max.join('.'), key: x.key, value: x.value }
      m.set('r', m.get('r').concat(event))
    }
    else {
      const event = { type: 'd', node: max.join('.'), key: x.key, value: x.value }
      m.set('d', m.get('d').concat(event))
    }
  })

  // Update
  diffMap.get('u').forEach(x => {
    const event = { type: 'u', node: x.key, key: x.key, value: x.value }
    m.set('u', m.get('u').concat(event))
  })

  return m
}

// ================
// Helper Functions
// ================

function getNode (diffKey, flatMap) {
  const k = flatMap.keys()
  const nodes = [ ...k ].map(bKey => {
    return _iterNode(diffKey, 0, bKey, null)
  })
  return nodes
}

function _iterNode (diffKey, i, bKey, node) {
  const n = node ? `${node}.` : ''
  const re = new RegExp(`^${n}${diffKey[i]}`)
  const match = re.exec(bKey)

  if (match) {
    return _iterNode(diffKey, i+1, bKey, `${n}${diffKey[i]}`)
  }
  else {
    if (i === 0) {
      return ''
    }
    else {
      return `${n}${diffKey[i]}`
    }
  }
}

// ===========================
// Reconciliation (DEPRECATED)
// ===========================

function unflatten (map) {
  let result = { }

  map.forEach((value, key) => {
    const _key = key.split('.')
    result = _unflatten(_key, value, result)
  })

  return result['root']
}

function _unflatten (array, val, res = { }) {
  const curr = array[0]
  const next = array[1]

  if (next) {
    if (!res[curr]) {
      res[curr] = !isNaN(parseInt(next, 10)) ? [ ] : { }
    }
    const newArr = array.splice(1, array.length)
    _unflatten(newArr, val, res[curr])
  }
  else {
    if (val === '[]') {
      // Handle empty array
      res[curr] = []
    }
    else {
      res[curr] = val
    }
  }

  return res
}

module.exports = {
  flatten,
  diffing,
  event
}
