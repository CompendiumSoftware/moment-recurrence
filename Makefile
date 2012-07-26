SRC = moment.recurrence.js

.PHONY: test mocha test-watch lint
test: mocha lint 

mocha:
	./node_modules/.bin/mocha test/rrule.js

test-watch: 
	./node_modules/.bin/mocha --watch $(SRC) test/rrule

lint:
	./node_modules/.bin/jshint $(SRC)
