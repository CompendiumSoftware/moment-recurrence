if ( typeof require !== 'undefined' )
{
  moment = require('moment');
}

(function(moment) {

  
  var FREQUENCIES = [
	"YEARLY",
	"MONTHLY",
	"WEEKLY",
	"DAILY",
	"HOURLY",
	"MINUTELY",
	"SECONDLY"
  ];
  
  
  
  var  exists = function(val){
	return typeof val !='undefined' && val !== null; 
  }	;
  
  function recurr(val){
	if( !exists(val)){
	  val = {};
	}
	
	this.freq  = val.freq || 'DAILY';
	this.interval = val.interval || 1;
	this.byDay= val.byDay || null;
	this.byMonth= val.byMonth | null;
	this.until= val.until || null;
	this.count = val.count || -1;
	
	return this;
  }
  
  
  recurr.prototype.isFinite = function(){
	return this.count > 0 || this.until !== null;
  };
  
  
  
  
  moment.fn.hasRecurrence= function(){
	return exists(this._recurrence);
  };
  
  moment.fn.hasFiniteRecurrences= function(){
	return exists(this._recurrence) && this._recurrence.isFinite();
  };
  
  
  moment.fn.recurr = function(pattern){
	this._recurrence = new recurr(pattern);
	return this;
  };
  

  var FREQ_HANDLER = {
	"YEARLY": {
	  next: function(m, rec){
		m.add({years: rec.interval});
	  }
	},
	
	"MONTHLY": {
	  next: function(m, rec){
		m.add({months: rec.interval});
	  }
	},
	"WEEKLY": {
	  next: function(m, rec){
		m.add({weeks: rec.interval});
	  }
	},
	"DAILY": {
	  next: function(m, rec){
		m.add({days: rec.interval});
	  }
	},
	"HOURLY": {
	  next: function(m, rec){
		m.add({hours: rec.interval});
	  }
	},

	"MINUTELY": {
	  next: function(m, rec){
		m.add({minutes: rec.interval});
	  }
	},
	"SECONDLY": {
	  next: function(m, rec){
		m.add({seconds: rec.interval});
	  }
	}
	
	
  };
  

  moment.fn.nextRecurrence =  function(){
	if (! exists(this._recurrence)){
	  return null;
	}
	var r = this._recurrence;
	
	//no more recurrences
	if ( r.count <=0 && r.until === null){
	  return null;
	}
	
	var n = moment(this);
	
	var f = FREQ_HANDLER[r.freq.toUpperCase()];
	if(typeof f == 'undefined'){
	  throw "Unknown recurrence freq type of "+r.freq;
	}
	
	
	f.next(n,r);
	
	r = new recurr(r);
	if(r.count >= 0){
	  r.count--;
	  n._recurrence = r;
	}
	
	
	
	
	
	return n;
	
  };




  

})(moment);
