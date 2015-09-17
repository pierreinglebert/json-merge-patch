REPORTER = spec
test:
	@NODE_ENV=test ./node_modules/.bin/mocha -b --reporter $(REPORTER) --recursive test

lint:
	./node_modules/.bin/eslint ./lib ./index.js

test-cov:
	./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- -R spec --recursive test

test-coveralls:
	./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- -R spec --recursive test
	cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js || true
	rm -rf lib-cov

clean:
	rm -rf ./coverage

.PHONY: test
