var scalaio = angular.module('scalaio', ['ngRoute','scalaioServices']);
scalaio.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'talks-template',
        controller: 'TalksCtrl'
      }).
//      when('/:talkId', {
//        templateUrl: 'talk-template',
//        controller: 'TalkCtrl'
//      }).
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
scalaioServices.factory('Talks', ['$resource', function($resource){
  return $resource(
    'http://cfp.scala.io/api/conferences/scalaIOFR2014/talks/:speakerId',
    {talkId:'@talkId'},
    {}
  );
}]);
scalaio.controller('TalksCtrl',['$scope','$location', 'Talks', function($scope,$location, Talks) {
  Talks.query(function(data){
    $scope.talks = data;
  });
}]);
