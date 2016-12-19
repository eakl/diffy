'use strict'



// Delta creator middleware
// Receive a payload with the update and create a delta format


var nodeType = type === 'node' ? (delta._t === 'a' ? 'array' : 'object') : '';

if (typeof key !== 'undefined') {
  this.nodeBegin(context, key, leftKey, type, nodeType, isLast);
} else {
  this.rootBegin(context, type, nodeType);


  if (typeof key !== 'undefined') {
  this.nodeEnd(context, key, leftKey, type, nodeType, isLast);
} else {
  this.rootEnd(context, type, nodeType);
}


(typeof key === 'number' ? key : parseInt(trimUnderscore(key), 10))




BaseFormatter.prototype.getDeltaType = function(delta, movedFrom) {
  if (typeof delta === 'undefined') {
    if (typeof movedFrom !== 'undefined') {
      return 'movedestination';
    }
    return 'unchanged';
  }
  if (isArray(delta)) {
    if (delta.length === 1) {
      return 'added';
    }
    if (delta.length === 2) {
      return 'modified';
    }
    if (delta.length === 3 && delta[2] === 0) {
      return 'deleted';
    }
    if (delta.length === 3 && delta[2] === 2) {
      return 'textdiff';
    }
    if (delta.length === 3 && delta[2] === 3) {
      return 'moved';
    }
  } else if (typeof delta === 'object') {
    return 'node';
  }
  return 'unknown';
};
