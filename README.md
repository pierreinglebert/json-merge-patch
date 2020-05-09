JSON Merge Patch
===============

[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][dep-image]][dep-url]
[![devDependency Status][devDep-image]][devDep-url]

An implementation of the JSON Merge Patch [RFC 7396](http://tools.ietf.org/html/rfc7396)

JSON Merge Patch [(RFC 7396)](http://tools.ietf.org/html/rfc7396) is a standard format that
allows you to update a JSON document by sending the changes rather than the whole document.
JSON Merge Patch plays well with the HTTP PATCH verb (method) and REST style programming.


## Install

Install the current version (and save it as a dependency):

### npm

```sh
$ npm install json-merge-patch --save
```


## Usage

### Applying patches:
```js
var source = {
  "title": "Goodbye!",
  "author" : {
		"givenName" : "John",
		"familyName" : "Doe"
	}
};

var patch = {
	"title": 'Hello!',
	"author": {
		"familyName": null
	}
}

var target = jsonmergepatch.apply(source, patch);

// target = {
// 	"title": "Hello!",
//   "author" : {
// 		"givenName" : "John",
// 	}
// }
```

### Generating patches:
```js
var source = {
  "title": "Goodbye!",
  "author" : "John Doe"
};

var target = {
	"title": "Hello!",
};

var patch = jsonmergepatch.generate(source, target);

// patch = {
// 	"title": 'Hello!',
// 	"author": null
// }
```


### Usage with Javascript objects

This library is primarily designed to work with JSON.
Nonetheless, it is possible to use Javascript objects if the method `toJSON()` is implemented, the library will then serialize your object using it.
```js
var patch = jsonmergepatch.generate(
  {
    "title": "Goodbye!"
  },
  {
    toJSON: () {
      return {
        "title": "I am serialized"
      }
    },
  }
);
// patch = {
// 	"title": "I am serialized",
// }
```

```js
var patch = jsonmergepatch.generate(
  {},
  {
    date: new Date("2020-05-09T00:00:00.000")
  }
);
// patch = {
// 	date: "2020-05-09T00:00:00.000"
// }
```

## API

#### jsonmergepatch.apply (`obj` Object, `patch` Object) : Object

Applies `patch` on `obj`.

#### jsonmergepatch.generate (`source` Object, `target` Object) : `patch` Object

Generates a `patch` Object from source and target Object.


#### jsonmergepatch.merge (`patch1` Object, `patch2` Object) : `patch` Object

Generates a `patch` Object by merging patch1 and patch2.


## Running tests

```sh
npm test
```

# License

  MIT

[travis-image]: https://img.shields.io/travis/pierreinglebert/json-merge-patch/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/pierreinglebert/json-merge-patch
[coveralls-image]: https://img.shields.io/coveralls/pierreinglebert/json-merge-patch/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/pierreinglebert/json-merge-patch?branch=master
[dep-image]: https://img.shields.io/david/pierreinglebert/json-merge-patch.svg
[dep-url]: https://david-dm.org/pierreinglebert/json-merge-patch
[devDep-image]: https://img.shields.io/david/dev/pierreinglebert/json-merge-patch.svg
[devDep-url]: https://david-dm.org/pierreinglebert/json-merge-patch#info=devDependencies
