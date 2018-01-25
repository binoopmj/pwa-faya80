$(function() {

	//location tab works here
	$( ".edition-list__item button" ).click(function() {
	  	var loc = $( this ).attr( "data-attr" );
	  	$( ".edition-list__item button" ).removeClass("active");
	  	$(this).addClass("active");
	  	$( "#event-list" ).empty(); // Clearing all the events before the tab content loads
		$.getJSON('location/'+ loc + '/'+ loc +'.json', function(data) {
	       $.each(data.event, function(key, value) {
	          var details = "<li class='loc-cls "+ value.technology +"'><div class='video-widget-wrap'><a href='/detail.html?loc="+loc +"&id="+value.eventID+"'><div class='video-thumb'><amp-img  width='100' height='50' layout='responsive' src='/location/"+loc+"/banners/"+ value.eventbanner +"'></amp-img><div class='video-overlay'></div></div></a><div class='video-detail-wrap'><h4>" + value.title + "</h4><span class='speaker'>" + value.speaker + "</span><span class='company'>" + value.profile + "</span><span class='month'>"+ value.date + "</span></div></div></li>"
	           $(details).appendTo("#event-list");
	           
	     	});
	    });
	    setTimeout(function(){ $('.video-widget-wrap').matchHeight({byRow: false});}, 100); // Reapplying Matchheight after tab works
	    $(".filter-list a").removeClass('active');
	    $(".filter-list a#all").addClass('active');
	});

	//loading tvm.json for the first page load
   $.getJSON('location/tvm/tvm.json', function(data) {
        $.each(data.event, function(key, value) {

           var details = "<li class='loc-cls "+ value.technology +"'><div class='video-widget-wrap'><a href='/detail.html?loc=tvm&id="+value.eventID+"'><div class='video-thumb'><amp-img  width='100' height='50' layout='responsive' src='/location/tvm/banners/"+ value.eventbanner +"'></amp-img><div class='video-overlay'></div></div></a><div class='video-detail-wrap'><h4>" + value.title + "</h4><span class='speaker'>" + value.speaker + "</span><span class='company'>" + value.profile + "</span><span class='month'>"+ value.date + "</span></div></div></li>"
           $(details).appendTo("#event-list");
           


           
			console.log(Math.max(55,100));


     	});
    });


});
//technology tab works here
$(function() {
	var jQuerybtns = $('.filter-list a').click(function(e) {
	    e.preventDefault();
	    if (this.id == 'all') {
	      $('.event-list > li').fadeIn(450);
	    } else {
	      var jQueryel = $('.' + this.id).fadeIn(450);
	      $('.event-list > li').not(jQueryel).hide('slow');
	    }
	    jQuerybtns.removeClass('active');
	    $(this).addClass('active');
  	});
  	
});
//Matchheight works here
$( document ).ready(function() {
    setTimeout(function(){ $('.video-widget-wrap').matchHeight({byRow: false});}, 500);
});