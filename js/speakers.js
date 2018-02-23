$(function() { 

  // Speaker details

  

	$.getJSON('/speakers/speakers.json', function(data) {

	    $.each(data.speakers, function(i, sp) {
	    	
	    	
	    	$.getJSON('/location/tvm/tvm.json', function(data) {

				var speakerdetail = "<h4>"+ sp.speaker +"</h4><br><span>"+ sp.profile +"</span>"
				$(speakerdetail).appendTo("#speaker-list");

			  	$.each(data.event, function(i, ev) {
					
			  		$.each(sp.events, function(j, evnt) {
							
			    		if (evnt == ev.eventID) {
			  				var eventlist = "<a href='detail.html?loc=tvm&id="+ sp.events +"'>"+ ev.title +"</a><br>"
			    			$(eventlist).appendTo("#speaker-list");
			  			}
			    	});
			  	});	 
			});

	        

	    }); 

	});



	
});