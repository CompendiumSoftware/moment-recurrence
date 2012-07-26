SRC = moment.recurrence.js

.PHONY: test mocha test-watch lint
test: mocha lint 

ci:
	./node_modules/.bin/mocha -R xunit test/rrule.js > junit.xml &&  ./node_modules/.bin/jshint $(SRC) --jslint-reporter > jshint.xml

mocha:
	./node_modules/.bin/mocha test/rrule.js

test-watch: 
	./node_modules/.bin/mocha --watch $(SRC) test/rrule

lint:
	./node_modules/.bin/jshint $(SRC)
