(function (angular) {
  "use strict";

  var app = angular.module('myApp.books', ['ngRoute', 'firebase.utils', 'firebase']);

  app.controller('BooksCtrl', ['$scope', 'booksList', function($scope, booksList) {
      $scope.books = booksList;
      $scope.addBook = function(newBook) {
        if( newBook ) {
          var b = newBook;
          $scope.books.$add({
            title:checkNull(b.title),
            author:checkNull(b.author),
            condition:checkNull(b.condition),
            category:checkNull(b.category)});
        }
      };
    }]);

  app.factory('booksList', ['fbutil', '$firebaseArray', function(fbutil, $firebaseArray) {
    var ref = fbutil.ref('books');
    return $firebaseArray(ref);
  }]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/books', {
      templateUrl: 'books/books.html',
      controller: 'BooksCtrl'
    });
  }]);

  function checkNull(val) {
    return val?val:"";
  }

})(angular);
