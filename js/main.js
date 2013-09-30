$(document).ready(function() {
     var opts = {
                 height: 900,
                 year:2013,
                 month:9,
                 date:24,
                 header:{
                    left:   '',
                    center: 'title',
                    right:  ''
                 },
                 minTime:'9:00',
                 maxTime:'18:30',
                 firstHour: 9,
                 allDaySlot: false,
                 slotEventOverlap:false,
                 slotMinutes:15,
                 defaultView: 'agendaDay',
                 //events: 'https://www.google.com/calendar/feeds/1uirn9pn5spas6ov3m8nllv3smpbetav%40import.calendar.google.com/public/basic',
                 events: {
                    url: '/calendar.json',
                    type: 'GET',
                    data: {                        
                    },
                    error: function(data) {
                        alert('there was an error while fetching events!'+data);
                    },
                    color: 'lightblue',   // a non-ajax option
                    textColor: 'black' // a non-ajax option
                 },
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
