$(function() { 

  // Speaker details

  

	$.getJSON('/speakers/speakers.json', function(data) {

	    $.each(data.speakers, function(i, sp) {
	    	
	    	
	    	$.getJSON('/location/all/events.json', function(data) {

				var speakerdetail = "<h4>"+ sp.speaker +"</h4><br><span>"+ sp.profile +"</span>"
				$(speakerdetail).appendTo("#speaker-list");

			  	$.each(data.event, function(i, ev) {
					
			  		$.each(sp.events, function(j, evnt) {
							
			    		if (evnt == ev.eventID) {
			    			if (ev.eventID.match("^T")) {
			    				var eventlist = "<a href='detail.html?loc=tvm&id="+ sp.events[j] +"'>"+ ev.title +"</a><br>"
			    				$(eventlist).appendTo("#speaker-list");
							}
							else if (ev.eventID.match("^C")){
								var eventlist = "<a href='detail.html?loc=kochi&id="+ sp.events[j] +"'>"+ ev.title +"</a><br>"
			    				$(eventlist).appendTo("#speaker-list");
							}
							else if (ev.eventID.match("^K")) {
								var eventlist = "<a href='detail.html?loc=kzkd&id="+ sp.events[j] +"'>"+ ev.title +"</a><br>"
			    				$(eventlist).appendTo("#speaker-list");
							}
			  				
			  			}
			    	});
			  	});	 
			});

	        

	    }); 

	});



	
});