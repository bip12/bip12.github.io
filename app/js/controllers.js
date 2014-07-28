'use strict';
/* Controllers */
angular.module('travelApp.controllers', [])

  .controller('NewPackageController', ['$scope','$http', 'JWTtoken', function($scope, $http, JWTtoken) {
	JWTtoken.getToken(function(JWTtoken) {
	$scope.myToken = JWTtoken["token"];	
	});
	$scope.createPackage = function(resultPackage) {
		var payload = {
		"package_name": $scope.package_name, 
		"description": $scope.description, 
		"start_date": $scope.start_date, 
		"end_date": $scope.end_date, 
		"package_type": $scope.package_type, 
		"flight": "false", 
		"hotel": "true", 
		"insurance": "false", 
		"restaurant": "false", 
		"local_booking": "false", 
		};	
		 $http({
		    url:"http://mighty-lowlands-2957.herokuapp.com/agentapp/packages/",
			method: "POST",
			data:payload,
			headers:{"Authorization":"JWT "+$scope.myToken
					}
		})
		.success(function(data, status, headers, config) {
			$scope[resultPackage] = data;
		})
		.error(function(data, status, headers, config) {
			$scope[resultPackage] = status; 
		});
	};
  }])
  
  .controller('CreatedPackagesController', ['$scope', 'packages', function($scope, packages) {
	  packages.list(function(packages) {
		  $scope.packages = packages;
	  });
  }])
  
  .controller('ReservedPackagesController', ['$scope', 'packages', function($scope, packages) {
		packages.list(function(packages) {
		  $scope.packages = packages;
	  });
	  $scope.Apackage={};
	  $scope.currentPackage={};
  }])
  
  .controller('PublishedPackagesController', ['$scope', 'packages', function($scope, packages) {
		packages.list(function(packages) {
		  $scope.packages = packages;
	  });
  }])
  
  .controller('PackageDetailController', ['$scope', '$routeParams', 'packages', '$http', 'JWTtoken', '$window', function($scope, $routeParams, packages, $http, JWTtoken, $window) {
	packages.find($routeParams.pid, function(singlepackage) {
		$scope.singlepackage = singlepackage;
	});
	
	JWTtoken.getToken(function(JWTtoken) {
	$scope.myTokenD = JWTtoken["token"];	
	});
	$scope.removePackage = function(removingpackage) {
		var deletePackage = $window.confirm('Are you sure you want to delete this package?');
		if (deletePackage) {
			$http({ url:'http://mighty-lowlands-2957.herokuapp.com/agentapp/packages/'+$routeParams.pid+'/',
			method: "DELETE",
			headers:{"Authorization":"JWT "+$scope.myTokenD}
			})
			.success(function(data, status, headers, config) {
				$scope[removingpackage] = data;
			})
			.error(function(data, status, headers, config) {
				$scope[removingpackage] = status; 
			});
			$window.alert('Package Deleted!');
		}
	}
  }])
  
  .controller('ReservePackageController', ['$scope', function($scope) {  
  }])
  
  .controller('SearchHotelsController', ['$scope', 'packages', '$routeParams', 'hotels', 'JWTtoken', '$http',
										function($scope, packages, $routeParams, hotels, JWTtoken, $http){
	
	packages.find($routeParams.pid, function(singlepackage) {
		$scope.singlepackage = singlepackage;
	});		
	// initializing $scope variables with default values for faster testing purpose
	$scope.hotelCity='Fremont';
	$scope.hotelState='CA';
	$scope.startDate="10/10/2014";
	$scope.endDate="10/12/2014";
	// "fresno", "CA", "10/10/2014", "10/12/2014"
	$scope.searchHotel = hotels.search ($scope.hotelCity, $scope.hotelState, $scope.startDate, $scope.endDate, function(results){
			$scope.hotelResults = results;
			console.log($scope.hotelResults);
		});
	
	JWTtoken.getToken(function(JWTtoken) {
		$scope.newToken = JWTtoken["token"];	
	});	
	
	// default values are provided by Expedia EAN's for testing purpose.
	
	$scope.bookSelectedHotel = function(booking) {
		 var payload = {
		"hotelId": $scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].hotelId,
		"arrivalDate": $scope.startDate,
		"departureDate": $scope.endDate,
		"supplierType": $scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].supplierType,
		"roomTypeCode": $scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].RoomRateDetailsList.RoomRateDetails.roomTypeCode,
		"rateCode": $scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].RoomRateDetailsList.RoomRateDetails.rateCode,
		"chargeableRate": $scope.hotelResults.HotelListResponse.HotelList.HotelSummary[0].RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo['@total'],
		"room1": "2",
		"room1FirstName": "test", 
		"room1LastName": "tester", 
		"room1BedTypeId": "23",
		"room1SmokingPreferece": "NS",
		"email": $scope.bookemail,
		"firstName": "test", 
		"lastName": "tester",
		"city": "Seattle", 
		"stateProvinceCode": "WA", 
		"countryCode": "US", 
		"postalCode": "98004"
		};	
		// "Content-Type": "application/json",
		 $http({
			url:"http://mighty-lowlands-2957.herokuapp.com/agentapp/hotel-reservation/",
			method: "POST",
			data: payload,
			headers:{"Content-Type": "application/json","Authorization":"JWT "+$scope.newToken}
		})
		.success(function(data, status, headers, config) {
			$scope.booking = data;
		})
		.error(function(data, status, headers, config) {
			$scope.booking = status; 
		});
	};
  }])
  
  //.controller('HotelSearchResultsController', ['$scope', 'packages', 'JWTtoken', '$routeParams', '$http', function($scope, packages, JWTtoken, $routeParams, $http){

//  }])
  
  .controller('BookHotelsController', ['$scope', 'packages', 'JWTtoken', '$routeParams', '$http', function($scope, packages, JWTtoken, $routeParams, $http){

  }])
