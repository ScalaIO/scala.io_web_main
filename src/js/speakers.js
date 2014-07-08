var handleSpeakers=function(data){
  var source = $("#speakers-template").html();
  var template = Handlebars.compile(source);
  var speakers = data;
  console.log(speakers);
  $("#speakers").html(template({speakers:speakers}));
};

window.onload=function(evt){
  $.getJSON("http://cfp.scala.io/api/conferences/scalaIOFR2014/speakers",handleSpeakers);
};
