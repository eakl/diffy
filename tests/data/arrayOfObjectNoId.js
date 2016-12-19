'use strict'

const arrayOfObject = [
  {a: 1, b: 2, c: 3, d: 4, e: 5},
  {a: 1, b: 2, c: 3, d: 4, e: 5},
  {a: 1, b: 2, c: 3, d: 4, e: 5},
  {a: 1, b: 2, c: 3, d: 4, e: 5},
  {a: 1, b: 2, c: 3, d: 4, e: 5},
  {a: 1, b: 2, c: 3, d: 4, e: 5}
]

const arrayOfArray = [
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5]
]

const arrayNestedObject = [
  {a: { b: { c: 3} }, d: { e: { f: 4 } }, g: { h: 10 } },
  {a: { b: { c: 3} }, d: { e: { f: 4 } }, g: { h: 10 } },
  {a: { b: { c: 3} }, d: { e: { f: 4 } }, g: { h: 10 } },
  {a: { b: { c: 3} }, d: { e: { f: 4 } }, g: { h: 10 } }
]

module.exports = {
  arrayOfObject,
  arrayOfArray,
  arrayNestedObject
}
