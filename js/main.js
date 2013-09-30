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
                 events: 'https://www.google.com/calendar/feeds/1uirn9pn5spas6ov3m8nllv3smpbetav%40import.calendar.google.com/public/basic',
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
