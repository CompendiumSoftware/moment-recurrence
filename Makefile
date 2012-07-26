SRC = moment.rrule.js

.PHONY: test mocha test-watch lint
test: mocha lint 

mocha:
	./node_modules/.bin/mocha

test-watch: 
	./node_modules/.bin/mocha --watch $(SRC) test/rrule.js

lint:
	./node_modules/.bin/jshint $(SRC)
