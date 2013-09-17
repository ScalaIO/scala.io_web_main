$(document).ready(function() {
     var opts = {
                 height: 616,
                 year:2013,
                 month:9,
                 date:24,
                 //header:{
                 //   left:   '',
                 //   center: '',
                 //   right:  ''
                 //},
                 firstHour: 9,
                 slotMinutes:10,
                 defaultView: 'agendaDay',
                 events: ('/calendar.json'),
                 eventClick: function(event) {
                     window.location = event.url;
                 }//,
                 //eventAfterRender:function( event, element, view ) {
                 //    console.log(event);
                 //   var b_class_name = (function(kk){
                 //      switch(kk){
                 //         case "Room 1" : return "room_1";
                 //         case "Room 2" : return "room_2";
                 //         case "Room 3" : return "room_3";
                 //         case "Workshop" : return "workshop";
                 //      }
                 //   }(event.location));
                 //   element.addClass(b_class_name);
                 //}
        };
        var opts2 = _.clone(opts);

    $('#calendar-thursday').fullCalendar(opts);
     opts2['date'] = 25;
    $('#calendar-friday').fullCalendar(opts2);
});
