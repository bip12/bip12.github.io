'use strict';


// Declare app level module which depends on filters, and services
angular.module('travelApp', [
  'ngRoute',
  'travelApp.filters',
  'travelApp.services',
  'travelApp.directives',
  'travelApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/new-package', {templateUrl: 'partials/new-package.html', controller: 'NewPackageController'});
  $routeProvider.when('/created-packages', {templateUrl: 'partials/created-packages.html', controller: 'CreatedPackagesController'});  
  $routeProvider.when('/reserved-packages', {templateUrl: 'partials/reserved-packages.html', controller: 'ReservedPackagesController'});
  $routeProvider.when('/published-packages', {templateUrl: 'partials/published-packages.html', controller: 'PublishedPackagesController'});
  $routeProvider.when('/assigned-packages', {templateUrl: 'partials/assigned-packages.html', controller: 'AssignedPackagesController'});
  $routeProvider.when('/created-packages/:pid', {templateUrl: 'partials/package-detail.html', controller: 'PackageDetailController'});
  $routeProvider.when('/created-packages/:pid/edit', {templateUrl: 'partials/edit-package.html', controller: 'PackageEditController'});
  $routeProvider.when('/created-packages/:pid/reserve', {templateUrl: 'partials/reserve-package.html', controller: 'PackageDetailController'});  
  $routeProvider.when('/created-packages/:pid/reserve/hotelSearch', {templateUrl: 'partials/hotel-search.html', controller: 'SearchHotelsController'});
  $routeProvider.when('/created-packages/:pid/reserve/hotelSearch/searchResults/:hotelCity/:hotelState/:startMonth/:startDay/:startYear/:endMonth/:endDay/:endYear', {templateUrl: 'partials/hotel-searchResults.html', controller: 'SearchHotelsResultsController'});  
  $routeProvider.when('/created-packages/:pid/reserve/hotelSearch/booking/:hid/:roomTypeCode/:rateCode/:chargeableRate', {templateUrl: 'partials/hotel-book.html', controller: 'HotelBookController'});
  $routeProvider.when('/created-packages/reserve/hotelSearch/booked', {templateUrl: 'partials/hotel-book-confirm.html', controller: 'HotelBookConfirmController'});
  $routeProvider.otherwise({redirectTo: '/created-packages'});
}]);
//:startMonth/:startDay/:startYear