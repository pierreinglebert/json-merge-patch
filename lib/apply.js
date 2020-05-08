'use strict';

function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]';
}

module.exports = function apply(target, patch) {
  if (patch === null || typeof patch !== 'object' || Array.isArray(patch) || isDate(patch)) {
    return patch;
  }
  // if we are here, patch is a non-null object. target should be a non-null object too.
  if (target === null || typeof target !== 'object' || Array.isArray(target) || isDate(target)) {
    target = {};
  }
  var keys = Object.keys(patch);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (patch[key] === null) {
      if (target.hasOwnProperty(key)) {
        delete target[key];
      }
    } else {
      target[key] = apply(target[key], patch[key]);
    }
  }
  return target;
};
