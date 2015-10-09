(function (angular) {
  "use strict";

  var app = angular.module('myApp.amy', ['ngRoute', 'firebase.utils', 'firebase']);

  app.controller('AmyCtrl', ['$scope', 'amyList', function($scope, amyList) {
      $scope.amyStuff = amyList;

      $scope.conditionOptions = [
        {rank: 1, name:"Fine"},
        {rank: 2, name:"Great"},
        {rank: 3, name:"Excellent"}
      ];

      $scope.addStuff = function(newStuff) {
        if( newStuff ) {
          var s = newStuff;
          $scope.amyStuff.$add({
            item:checkNull(s.item),
            color:checkNull(s.color),
            brand:checkNull(s.brand),
            size:checkNull(s.size),
            condition:checkNull(s.condition),
            quantity:checkNull(s.quantity)
          });
        }
      };
    }]);

  app.factory('amyList', ['fbutil', '$firebaseArray', function(fbutil, $firebaseArray) {
    var ref = fbutil.ref('amy');
    console.log($firebaseArray(ref));
    return $firebaseArray(ref);
  }]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/amy', {
      templateUrl: 'amy/amy.html',
      controller: 'AmyCtrl'
    });
  }]);

  function checkNull(val) {
    return val?val:"";
  }

})(angular);
