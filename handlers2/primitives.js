'use strict'

const { typeOf } = require('../helpers/equal')

function diffPrimitive (p1, p2, path, events) {

  if (p1 === undefined) {
    events.created.push(['DIFF_CREATE', path, p2])
    return events
    // return delta(events)
  }

  if (p1 && typeOf(p1) !== typeOf(p2)) {
    events.deleted.push(['DIFF_DELETE', path, p1]) // delete the object
    events.created.push(['DIFF_CREATE', path, p2])
    return events
    // return delta(events)
  }

  events.updated.push(['DIFF_UPDATE', path, p2])

  return events

  // console.log(JSON.stringify(events, null, 2))
  // return delta(events)
}

module.exports = {
  diffPrimitive
}
