var scalaio = angular.module('scalaio', ['ngRoute','scalaioServices']);
scalaio.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'speakers-template',
        controller: 'SpeakersCtrl'
      }).
      when('/:speakerId', {
        templateUrl: 'speaker-bio-template',
        controller: 'SpeakerCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(false);
  }]);
scalaio.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
var scalaioServices=angular.module('scalaioServices', ['ngResource']);
scalaioServices.factory('Speakers', ['$resource', function($resource){
  return $resource(
    'http://cfp.scala.io/api/conferences/scalaIOFR2014/speakers/:speakerId',
    {speakerId:'@speakerId'},
    {}
  );
}]);
scalaioServices.factory('Talks', ['$resource', function($resource){
  return $resource(
    'http://cfp.scala.io/api/conferences/scalaIOFR2014/speakers/:speakerId',
    {speakerId:'@speakerId'},
    {}
  );
}]);
scalaio.controller('SpeakersCtrl',['$scope','$location', 'Speakers', function($scope,$location, Speakers) {
  $scope.coucou="coucou"
  Speakers.query(function(data){
    $scope.speakerGroups = $scope.grouped(6, data);
  });
  $scope.showSpeaker = function(speakerId){
    $location.path("/"+speakerId)
  }
  $scope.grouped = function(size, array){
    var result = [], count = 0, group = [];
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
}]);
scalaio.controller('SpeakerCtrl', ['$scope','$routeParams','$sce','Speakers',function ($scope,$routeParams,$sce,Speakers) {
  Speakers.get(
    {speakerId:$routeParams.speakerId},
    function(data){
      $scope.speaker = data;
      $scope.speakerBio = $sce.trustAsHtml('<img class="avatar left" src="'+data.avatarURL+'"></img>'+data.bioAsHtml);
    });
  $scope.hasNoCompany=function(speaker){
    console.dir(speaker);
    return !speaker || !speaker.company || speaker.company.trim ==""
  };
}]);
scalaio.controller('TalkCtrl', function ($scope) {
});
scalaio.controller('TalksCtrl', function ($scope) {
});
