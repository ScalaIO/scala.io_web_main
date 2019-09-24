var scalaio = angular.module('scalaio', ['ngRoute', 'scalaioServices']);
scalaio.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'talks-template',
            controller: 'SubmissionsCtrl',
            reloadOnSearch: false
        }).
        otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(false);
    }
]);
scalaio.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
var scalaioServices = angular.module('scalaioServices', ['ngResource']);
scalaioServices.factory('Submissions', ['$resource', function($resource) {
    return $resource(
        'json/submissions.json', { talkId: '@talkId' }, {}
    );
}]);
scalaio.controller('SubmissionsCtrl', ['$scope', '$location', 'Submissions', '$anchorScroll', function($scope, $location, Talks, $anchorScroll) {

    Talks.query(function(data) {
        $scope.submissions = data;
    });
    $scope.getLang = function(tags) {
       if (tags && tags.includes("🇫🇷")) return "fr";
       return "en";
    };
    $scope.hasNoCompany = function(speaker) {
        return !speaker ||  !speaker.company || speaker.company.trim() == "" || speaker.company.trim() == "-" || speaker.company.trim() == " -"
    };
    $scope.hasNoTwitter = function(speaker) {
        return !speaker ||  !speaker.twitter || speaker.twitter.trim() == ""
    };
    $scope.scroll = function() {
        console.log("scrolling to hash anchor" + $location.hash());
        $anchorScroll();
    };
}]);