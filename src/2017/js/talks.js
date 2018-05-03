var scalaio = angular.module('scalaio', ['ngRoute','scalaioServices']);
scalaio.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'talks-template',
        controller: 'TalksCtrl',
        reloadOnSearch: false
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
scalaioServices.factory('Talks', ['$resource', function($resource){
  return $resource(
    'json/talks.json',
    {talkId:'@talkId'},
    {}
  );
}]);
scalaio.controller('TalksCtrl',['$scope','$location', 'Talks','$anchorScroll', function($scope,$location, Talks,$anchorScroll) {

  Talks.query(function(data){
    $scope.talks = data;

  });
  $scope.hasNoCompany=function(speaker){
    return !speaker || !speaker.company || speaker.company.trim() =="" || speaker.company.trim() =="-" || speaker.company.trim() ==" -"
  };
  $scope.hasNoTwitter=function(speaker){
    return !speaker || !speaker.twitter || speaker.twitter.trim() ==""
  };
  $scope.scroll=function(){
    console.log("scrolling to hash anchor")
    $anchorScroll();
  };
}]);
