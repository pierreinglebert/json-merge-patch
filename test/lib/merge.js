'use strict';

var assert = require('chai').assert;

var merge = require('../../lib/merge');

describe('merge', function() {

  it('should merge 2 patches with different attributes', function() {
    assert.deepEqual(
      merge({a: 'b'}, {b: 'c'}),
      {a: 'b', b: 'c'}
    );
  });

  it('should merge take last patch attributes for rewriting', function() {
    assert.deepEqual(
      merge({a: 'b'}, {a: 'c'}),
      {a: 'c'}
    );
  });

  it('should merge take last patch attributes for rewriting and keep other attributes', function() {
    assert.deepEqual(
      merge({a: 'b', b: 'd'}, {a: 'c'}),
      {a: 'c', b: 'd'}
    );
  });

  it('should keep null attributes for deleting', function() {
    assert.deepEqual(
      merge({a: null}, {b: 'c'}),
      {a: null, b: 'c'}
    );
  });

  it('should replace null with newer attribute', function() {
    assert.deepEqual(
      merge({a: null}, {a: 'b'}),
      {a: 'b'}
    );
  });

  it('should replace an attribute with null if newer', function() {
    assert.deepEqual(
      merge({a: 'b'}, {a: null}),
      {a: null}
    );
  });

  it('should replace an array with an object', function() {
    assert.deepEqual(
      merge([], {a: 'b'}),
      {a: 'b'}
    );
  });

  it('should replace an object with an array', function() {
    assert.deepEqual(
      merge({a: 'b'}, []),
      []
    );
  });

  it('should merge sub objects', function() {
    assert.deepEqual(
      merge({a: {b: {c: 'd'}}, d: 'e'}, {a: {b: 'a'}}),
      {a: {b: 'a'}, d: 'e'}
    );
  });

  it('should merge recursively', function() {
    assert.deepEqual(
      merge({a: {b: {c: 'd'}, d: 'e'}}, {a: {b: {c: 'e'}}}),
      {a: {b: {c: 'e'}, d: 'e'}}
    );
  });

  it('should replace object with with null value', function() {
    assert.deepEqual(
      merge({a: 'b'}, null),
      null
    );
  });
});
