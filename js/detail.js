$(function() { 
  var url_string = window.location.href; //window.location.href
  var url = new URL(url_string);
  var location = url.searchParams.get("loc");
  var eID = url.searchParams.get("id");


  // People to Follow 

  $.getJSON('/location/'+ location +'/' + location + '.json', function(data) {

    $.each(data.event, function(i, f) {

      

      if (f.eventID == eID) {

        if (f.youtubeID == "") {
          var bannerdetail = "<div class='video-wrap'><img class='event-banner' src='/location/"+f.location+"/banners/"+ f.eventbanner +"'/></div>"
        } else {
          var bannerdetail = "<div class='video-wrap'><amp-youtube data-videoid='"+ f.youtubeID +"' layout='responsive' width='480' height='270'></amp-youtube></div>"
        }
        
        var eventdetail = "<div class='event-detail'><h4>"+ f.title +"</h4><span class='speaker-detail speaker'>By: " + f.speaker + "</span><span class='speaker-detail month'>Streamed live on " + f.date + "</span><p class='event-content'>"+ f.details +"</p></div><div class='speaker-wrap'><img class='speaker-thumb' src='/location/"+ location +"/speakers/"+ f.thumb +"'><h3>"+ f.speaker +"</h3><span class='speaker-name'><span class='speaker-detail company'>" + f.profile + "</span></span><div class='details'><p>"+ f.speakerdesc +"</p></div></div>"
        
        $(bannerdetail).appendTo("#event-detail-wrap");
        $(eventdetail).appendTo("#event-detail-wrap");

      } 
      

    });

  });



});

        
