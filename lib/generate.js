'use strict';

var equal = require('fast-deep-equal');
var serialize = require('./utils').serialize;

function arrayEquals(before, after) {
  if (before.length !== after.length) {
    return false;
  }
  for (var i = 0; i < before.length; i++) {
    if (!equal(after[i], before[i])) {
      return false;
    }
  }
  return true;
}

module.exports = function generate(before, after) {
  before = serialize(before);
  after = serialize(after);

  if (!(before instanceof Object) &&
      !(after instanceof Object) &&
      before === after) { // Return no op when values match
    return {}
  }

  if (before === null || after === null ||
    typeof before !== 'object' || typeof after !== 'object' ||
    Array.isArray(before) || Array.isArray(after)) {
    return serialize(after);
  }

  let patch = {};
  for (let key of Object.keys(before)) {
    let newVal = null;
    if (key in after) {
      newVal = generate(before[key], after[key]);
    }
    if (equal(newVal, {})) {
      continue;
    }
    patch[key] = serialize(newVal);
  }

  for (let key of Object.keys(after)) {
    if (!(key in before)) {
      patch[key] = serialize(after[key]);
    }
  }

  return (Object.keys(patch).length > 0 ? patch : {});
};
