'use strict';

var assert = require('chai').assert;

var apply = require('../../lib/apply');

describe('apply', function() {
	it('should replace an attribute', function() {
		assert.deepEqual(
			apply({a: 'b'}, {a: 'c'}),
	    {a: 'c'}
    );
	});

	it('should add an attribute', function() {
		assert.deepEqual(
			apply({a: 'b'}, {b: 'c'}),
	    {a: 'b', b: 'c'}
    );
	});

	it('should delete attribute', function() {
		assert.deepEqual(
			apply({a: 'b'}, {a: null}),
	    {}
    );
	});

	it('should delete attribute without affecting others', function() {
		assert.deepEqual(
			apply({a: 'b', b: 'c'}, {a: null}),
	    {b: 'c'}
    );
	});

	it('should replace array with a string', function() {
		assert.deepEqual(
			apply({a: ['b']}, {a: 'c'}),
	    {a: 'c'}
    );
	});

	it('should replace an string with an array', function() {
		assert.deepEqual(
			apply({a: 'c'}, {a: ['b']}),
	    {a: ['b']}
    );
	});

	it('should apply recursively', function() {
		assert.deepEqual(
			apply({a: {b: 'c'}}, {a: {b: 'd', c: null}}),
	    {a: {b: 'd'}}
    );
	});

	it('should replace an object array with a number array', function() {
		assert.deepEqual(
			apply({a: [{b: 'c'}]}, {a: [1]}),
	    {a: [1]}
    );
	});

	it('should replace an array', function() {
		assert.deepEqual(
			apply(['a', 'b'], ['c', 'd']),
			['c', 'd']
    );
	});

	it('should replace an object with an array', function() {
		assert.deepEqual(
			apply({a: 'b'}, ['c']),
			['c']
    );
	});

	it('should replace an object with null', function() {
		assert.deepEqual(
			apply({a: 'foo'}, null),
			null
    );
	});

	it('should replace an object with a string', function() {
		assert.deepEqual(
			apply({a: 'foo'}, 'bar'),
			'bar'
    );
	});

	it('should not change null attributes', function() {
		assert.deepEqual(
			apply({e: null}, {a: 1}),
			{e: null, a: 1}
    );
	});

	it('should not set an attribute to null', function() {
		assert.deepEqual(
			apply([1, 2], {a: 'b', c: null}),
			{a: 'b'}
    );
	});

	it('should not set an attribute to null in a sub object', function() {
		assert.deepEqual(
			apply({}, {a: {bb: {ccc: null}}}),
			{a: {bb: {}}}
		);
	});
  
  it('should replace an object with a date', function() {
		assert.deepEqual(
			apply({a: 'foo'}, new Date('2020-05-08')),
			new Date('2020-05-08')
    );
	});
  
  it('should add a date attribute', function() {
		assert.deepEqual(
			apply({a: 'foo'}, {b: new Date('2020-05-20')}),
      {a: 'foo', b: new Date('2020-05-20')}
    );
	});
  
  it('should replace a date attribute', function() {
		assert.deepEqual(
			apply({a: new Date('2020-05-08')}, {a: new Date('2020-05-20')}),
      {a: new Date('2020-05-20')}
    );
	});
  
  it('should delete a date attribute', function() {
		assert.deepEqual(
			apply({a: new Date('2020-05-20')}, {a: null}),
      {}
    );
	});
});
