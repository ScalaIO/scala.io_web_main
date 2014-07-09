var grouped = function(size, array){
  var result = []
  var count = 0;
  var group = []
  for (i = 0;i < array.length;i++){
    if (count < size){
      group.push(array[i]);
      count=count+1;
    }else{
      result.push(group);
      group=[array[i]];
      count=1;
    }
  }
  result.push(group);
  return result;
}
var handleSpeakers=function(data){
  var source = $("#speakers-template").html();
  var template = Handlebars.compile(source);
  var groupedArrays = grouped(5, data);
  var groups = []
  for(i=0;i<groupedArrays.length;i++){
    groups.push({speakers:groupedArrays[i]});
  }
  console.dir({groups:groups});
  $("#speakers").html(template({groups:groups}));
};

window.onload=function(evt){
  $.getJSON("http://cfp.scala.io/api/conferences/scalaIOFR2014/speakers",handleSpeakers);
};
