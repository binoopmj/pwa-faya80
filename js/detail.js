$(function() { 
  var url_string = window.location.href; //window.location.href
  var url = new URL(url_string);
  var location = url.searchParams.get("loc");
  var eID = url.searchParams.get("id");


  // People to Follow 

  $.getJSON('/location/'+ location +'/' + location + '.json', function(data) {

    $.each(data.event, function(i, f) {

      

        // var follow = "<amp-youtube data-videoid='"+ f.youtubeID +"' layout='responsive' width='480' height='270'></amp-youtube><div class='event-detail'><h4>"+ f.title +"</h4><span class='speaker-detail speaker'>By: " + f.speaker + "</span><span class='speaker-detail company'>" + f.profile + "</span><span class='speaker-detail month'>Streamed live on " + f.date + "</span><p>"+ f.details +"</p></div>"

        // $(follow).appendTo("#event-detail-wrap");
      

      if (f.eventID == eID) {

        var eventdetail = "<amp-youtube data-videoid='"+ f.youtubeID +"' layout='responsive' width='480' height='270'></amp-youtube><div class='event-detail'><h4>"+ f.title +"</h4><img class='speaker-thumb' src='/location/"+ location +"/speakers/"+ f.thumb +"'><span class='speaker-detail speaker'>By: " + f.speaker + "</span><span class='speaker-detail company'>" + f.profile + "</span><span class='speaker-detail month'>Streamed live on " + f.date + "</span><p class='event-content'>"+ f.details +"</p></div>"

        $(eventdetail).appendTo("#event-detail-wrap");

      } 
      

    });

  });



});

        
