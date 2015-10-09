(function (angular) {
  "use strict";

  var app = angular.module('myApp.amy', ['ngRoute', 'firebase.utils', 'firebase', 'myApp.utils']);

  app.controller('AmyCtrl', ['$scope', 'amyList', 'csvToArrayUtil', function($scope, amyList, csvToArrayUtil) {
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

      $scope.addBatch = function(batStuff){
        var parsed = csvToArrayUtil.convertCsvToArray(batStuff.csv, ",");
        for(var i = 0; i <= parsed.length-1; i++){
          var s = parsed[i];
          console.log(s);
          var stuff = {
            item:checkNull(s[0]),
            color:checkNull(s[1]),
            brand:checkNull(s[2]),
            size:checkNull(s[3]),
            condition:checkNull(s[4]),
            quantity:checkNull(s[5])
          }
          console.log(stuff);
          $scope.amyStuff.$add(stuff);
        }
      };
    }]);

  app.factory('amyList', ['fbutil', '$firebaseArray', function(fbutil, $firebaseArray) {
    var ref = fbutil.ref('amy');
    return $firebaseArray(ref);
  }]);

  app.filter('conditionToText', function() {
    return function(num) {
      if(num == 3){return 'Excellent'}
      else if(num == 2){return 'Great'}
      else if(num == 1){return 'Fair'}
      else {return ''}
    };
  });

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
