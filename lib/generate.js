'use strict';

function arrayEquals(before, after) {
  if(before.length !== after.length) {
    return false;
  }
  for(var i=0; i<before.length; i++) {
    if(after[i] !== before[i]) {
      return false;
    }
  }
  return true;
}

module.exports = function generate(before, after) {
  if(before === null || after === null ||
    typeof before !== 'object' || typeof after !== 'object' ||
    Array.isArray(before) !== Array.isArray(after)) {
    return after;
  }

  if(Array.isArray(before)) {
    if(!arrayEquals(before, after)) {
      return after;
    }
    return undefined;
  }

  var patch = {};
  var beforeKeys = Object.keys(before);
  var afterKeys = Object.keys(after);

  // removed elements
  beforeKeys.filter(function(key) {
    return afterKeys.indexOf(key) === -1;
  })
  .forEach(function(key) {
    patch[key] = null;
  });

  // new elements
  afterKeys.filter(function(key) {
    return beforeKeys.indexOf(key) === -1;
  })
  .forEach(function(key) {
    patch[key] = after[key];
  });

  // modified elements
  beforeKeys.filter(function(i) {
    return afterKeys.indexOf(i) !== -1;
  })
  .forEach(function(key) {
    if(before[key] !== null && typeof before[key] === 'object') {
      var subPatch = generate(before[key], after[key]);
      if(subPatch !== undefined) {
        patch[key] = subPatch;
      }
    } else if(before[key] !== after[key]) {
      patch[key] = after[key];
    }
  });
  return (Object.keys(patch).length > 0 ? patch : undefined);
};
