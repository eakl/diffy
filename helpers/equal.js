'use strict'

const { isObject } = require('./object')
const { isString, isBool, isNum } = require('./primitive')

// =================
// Helpers Functions
// =================

function equal (a, b) {
  if (arguments.length === 0) {
    return false
  }
  // Handle missing, null or undefined
  if (a && !b) {
    return false
  }
  // Type checking
  if (typeOf(a) !== typeOf(b)) {
    return false
  }
  // Array checking
  if (Array.isArray(b)) {
    if (b.length !== a.length) {
      return false
    }
  }
  // Object and Array recurssion
  if (b && typeof b === 'object') {
    // Insertion
    for (let i in b) {
      if (!equal(a[i], b[i])) {
        return false
      }
    }
    // Deletion
    for (let i in a) {
      if (!equal(a[i], b[i])) {
        return false
      }
    }
    return true
  }
  // Primitive testing
  return a === b
}

function typeOf (o) {
  return Array.isArray(o) ? 'array' : typeof o
}

const un = {
  arr: [
    { arr: [
      { arr: ['un', 'deux'] },
      { arr: ['un', 'deux'] }
    ]},
    { arr: [
      { arr: ['un', 'deux'] },
      { arr: ['un', 'deux'] }
    ]}
  ]
}

const deux = {
  arr: [
    { arr: [
      { arr: ['un', 'deux'] },
      { arr: ['un', 'deux'] }
    ]},
    { arr: [
      { arr: ['un', 'deux'] },
      { arr: ['un', 'deu'] }
    ]}
  ]
}

// console.log(equal(un, deux))
console.log(equal([], []))
console.log(equal({}, []))
console.log(equal(null, []))
console.log(equal(['un'], []))

module.exports = {
  equal,
  typeOf
}
