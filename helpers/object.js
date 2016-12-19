'use strict'

const isObject = o => (typeof o === 'object') && !Array.isArray(o)

function travel (obj, node, path) {
  if (typeof obj === 'object') {
    const p = node ? path.concat(node) : path
    const oKeys = Object.keys(obj)

    if (oKeys.length === 0) {
      // Handle empty array
      // call value function
      return value(obj)
    }
    else {
      // call recurse and record path
      return oKeys.map(x => travel(obj[x], x, p))
    }
  }
  return obj
}


function value (val) {
  if (Array.isArray(val)) {
    return []
  }
  else if (isObject(val)) {
    return {}
  }
  else {
    return val
  }
}

module.exports = {
  isObject
}
