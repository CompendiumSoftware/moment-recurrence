  var moment = require('moment');
  var should  = require('chai').should();
   require('../moment.recurrence');

describe("recurrence", function(){
  
  it("should not be recurring by default", function(){
	moment().hasRecurrence().should.equal(false);
  });

  it("should have recurrences after creating one", function(){
	var m = moment();
	m.recurr({count: 1});
	m.should.have.property("_recurrence");
			 
	moment().recurr({count: 1}).hasRecurrence().should.equal(true);
  });
  
  it("should have finite recurrences when limited", function(){
	moment().recurr({count: 1}).hasFiniteRecurrences().should.equal(true);
  });
  
  it("should have infinite recurrences when not limited", function(){
	
	var m = moment();
	m.recurr({});
	
	moment().recurr().hasFiniteRecurrences().should.equal(false);
  });
  
  it("Yearly patterns should work", function(){
	
	var m = moment("1982-1-1");
	m.recurr({freq: "YEARLY", interval : 2, count: 2});

	var n = m.nextRecurrence();
	
	n.should.not.equal(null);
	n.date().should.equal(m.date());
	n.month().should.equal(m.month());
	n.year().should.equal(m.year()+2);
	n.hasRecurrence().should.equal(true);
	
	//next call should work
	n = n.nextRecurrence();
	n.should.not.equal(null);
	
	//next call should return null
	n = n.nextRecurrence();
	should.not.exist(n);
  });
  
  it("should work with monthly patterns", function(){
	
	var m = moment("1982-1-1");
	m.recurr({freq: "monthly", interval : 2, count: 2});

	var n = m.nextRecurrence();
	
	n.should.not.equal(null);
	n.date().should.equal(m.date());
	n.month().should.equal(m.month()+2);
	n.year().should.equal(m.year());
	n.hasRecurrence().should.equal(true);
	//next call should work
	n = n.nextRecurrence();
	n.should.not.equal(null);
	
	//next call should return null
	n = n.nextRecurrence();
	should.not.exist(n);
	
  });
  
  it("should work with weekly patterns", function(){
	
	var m = moment("1982-1-1");
	m.recurr({freq: "weekly", interval : 2, count: 2});

	var n = m.nextRecurrence();
	
	n.should.not.equal(null);
	n.date().should.equal(m.date()+14);
	n.day().should.equal(m.day());
	n.month().should.equal(m.month());
	n.year().should.equal(m.year());
	n.hasRecurrence().should.equal(true);
	
	//next call should work
	n = n.nextRecurrence();
	n.should.not.equal(null);
	
	//next call should return null
	n = n.nextRecurrence();
	should.not.exist(n);
  });
  
  it("shoudl work with daily patterns", function(){
	
	var m = moment("1982-1-1");
	m.recurr({freq: "daily", interval : 2, count: 2});

	var n = m.nextRecurrence();
	
	n.should.not.equal(null);
	n.date().should.equal(m.date()+2);
	n.month().should.equal(m.month());
	n.year().should.equal(m.year());
	n.hasRecurrence().should.equal(true);
	
	//next call should work
	n = n.nextRecurrence();
	n.should.not.equal(null);
	
	//next call should return null
	n = n.nextRecurrence();
	should.not.exist(n);
  });
  
});
