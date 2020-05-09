'use strict';

var assert = require('chai').assert;

var generate = require('../../lib/generate');

describe('generate', function() {
  it('should generate a patch replacing an attribute', function() {
    assert.deepEqual(
      generate({a: 'b'}, {a: 'c'}),
	    {a: 'c'}
    );
  });

  it('should generate a patch adding an attribute', function() {
    assert.deepEqual(
      generate({a: 'b'}, { a: 'b', b: 'c'}),
      {b: 'c'}
    );
  });

  it('should generate a patch deleting an attribute', function() {
    assert.deepEqual(
      generate({a: 'b'}, {}),
      {a: null}
    );
  });

  it('should generate a patch deleting an attribute without affecting others', function() {
    assert.deepEqual(
      generate({a: 'b', b: 'c'}, {b: 'c'}),
      {a: null}
    );
  });

  it('should generate a patch replacing an attribute if its an array', function() {
    assert.deepEqual(
      generate({a: ['b']}, {a: 'c'}),
      {a: 'c'}
    );
  });

  it('should generate a patch replacing the attribute with an array', function() {
    assert.deepEqual(
      generate({a: 'c'}, {a: ['b']}),
      {a: ['b']}
    );
  });

  it('should generate a patch replacing an object array with a number array', function() {
    assert.deepEqual(
      generate({a: [{b: 'c'}]}, {a: [1]}),
      {a: [1]}
    );
  });

  it('should generate a patch replacing whole array if one element has changed', function() {
    assert.deepEqual(
      generate(['a', 'b'], ['c', 'd']),
      ['c', 'd']
    );
  });

  it('should generate a patch replacing whole array if one element has been deleted', function() {
    assert.deepEqual(
      generate(['a', 'b'], ['a']),
      ['a']
    );
  });

  it('should generate a patch replacing with an array', function() {
    assert.deepEqual(
      generate({a: 'b'}, ['c']),
      ['c']
    );
  });

  it('should generate a patch replacing with null', function() {
    assert.deepEqual(
      generate({a: 'foo'}, null),
      null
    );
  });

  it('should generate a patch replacing with a string', function() {
    assert.deepEqual(
      generate({a: 'foo'}, 'bar'),
      'bar'
    );
  });

  it('should generate a patch replacing with an object implementing toJSON() method', function() {
    assert.deepEqual(
      generate({a: 'foo'}, new Date('2020-05-09T00:00:00.000Z')),
      '2020-05-09T00:00:00.000Z'
    );
  });

  it('should generate a patch replacing a property with an object implementing toJSON() method', function() {
    assert.deepEqual(
      generate({a: 'foo'}, {a: new Date('2020-05-09T00:00:00.000Z')}),
      {a: '2020-05-09T00:00:00.000Z'}
    );
  });

  it('should generate a patch adding a property with an object implementing toJSON() method', function() {
    assert.deepEqual(
      generate({}, {b: new Date('2020-05-09T00:00:00.000Z')}),
      {
        b: '2020-05-09T00:00:00.000Z'
      }
    );
  });

  it('should generate a patch keeping null attributes', function() {
    assert.deepEqual(
      generate({e: null}, {e: null, a: 1}),
      {a: 1}
    );
  });

  it('should work recursively', function() {
    assert.deepEqual(
      generate({}, {a: {bb: {}}}),
      {a: {bb: {}}}
    );
  });

  it('should return undefined if the object hasnt changed', function() {
    assert.deepEqual(
      generate({a: 'a'}, {a: 'a'}),
      undefined
    );
  });

  it('should return undefined if the object with sub attributes hasnt changed', function() {
    assert.deepEqual(
      generate({a: {b: 'c'}}, {a: {b: 'c'}}),
      undefined
    );
  });

  it('should return undefined if the array hasnt changed', function() {
    assert.deepEqual(
      generate([1, 2, 3], [1, 2, 3]),
      undefined
    );
  });

});
