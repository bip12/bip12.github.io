'use strict';
/* Controllers */
angular.module('travelApp.controllers', [])

  .controller('NewPackageController', ['$scope','$http', 'JWTtoken', '$window', function($scope, $http, JWTtoken, $window) {
	JWTtoken.getToken().then(function(result){
		$scope.myToken = result.data.token;	
	});
	$scope.createPackage = function(resultPackage) {
		var createPackage = $window.confirm('Are you sure you want to create this package?');
		if (createPackage) {
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
				url:"http://blooming-dusk-7345.herokuapp.com/agentapp/packages/",
				method: "POST",
				data:payload,
				headers:{"Authorization":"JWT "+$scope.myToken}
			})
			.success(function(data, status, headers, config) {
				$scope[resultPackage] = data;
				$window.alert('Package Created!');
			})
			.error(function(data, status, headers, config) {
				$scope[resultPackage] = status; 
				$window.alert(data['detail']);
			});
		}
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
  
  .controller('AssignedPackagesController', ['$scope', 'packages', function($scope, packages) {
		packages.list(function(packages) {
		  $scope.packages = packages;
	  });
  }])
  
  .controller('PackageDetailController', ['$scope', '$routeParams', 'packages', '$http', 'JWTtoken', '$window', function($scope, $routeParams, packages, $http, JWTtoken, $window) {
	packages.find($routeParams.pid, function(singlepackage) {
		$scope.singlepackage = singlepackage;
	});	
	
	JWTtoken.getToken().then(function(result){
		$scope.myTokenD = result.data.token;	
	});
	$scope.removePackage = function(removingpackage) {
		var deletePackage = $window.confirm('Are you sure you want to delete this package?');
		if (deletePackage) {
			$http({ url:'http://blooming-dusk-7345.herokuapp.com/agentapp/packages/'+$routeParams.pid+'/',
			method: "DELETE",
			headers:{"Authorization":"JWT "+$scope.myTokenD}
			})
			.success(function(data, status, headers, config) {
				$scope[removingpackage] = data;
				$window.alert('Package Deleted!');
			})
			.error(function(data, status, headers, config) {
				$scope[removingpackage] = status; 
				$window.alert(data['detail']);
			});
		}
	}
  }])
  .controller('PackageEditController', ['$scope', '$routeParams', 'packages', '$http', 'JWTtoken', '$window', 
										function($scope, $routeParams, packages, $http, JWTtoken, $window) {
	$scope.editingPackage={};
	 packages.find($routeParams.pid, function(singlepackage) {
		$scope.editingPackage = singlepackage;		
		$scope.package_type = $scope.editingPackage.package_type;
		$scope.package_name = $scope.editingPackage.package_name;
		$scope.description = $scope.editingPackage.description;
		$scope.start_date = $scope.editingPackage.start_date;
		$scope.end_date = $scope.editingPackage.end_date;
	});
	
	$scope.updatePackage = function(updateResult) {
		var editPackage = $window.confirm('Are you sure you want to update this package?');
		if (editPackage) {
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
			
			JWTtoken.getToken().then(function(result){
				
				var token = result.data.token;
				$http({ url:'http://blooming-dusk-7345.herokuapp.com/agentapp/packages/'+$routeParams.pid+'/',
				method: "PUT",
				data:payload,
				headers:{"Content-Type": "application/json", "Authorization":"JWT "+token}
				})
				.success(function(data, status, headers, config) {
					$scope[updateResult] = data;
					$window.alert('Package updated!');
				})
				.error(function(data, status, headers, config) {
					$scope[updateResult] = status; 
					$window.alert(data['detail']);
				});
			});
		}
	}
  }])
  
  .controller('ReservePackageController', ['$scope', function($scope) {  
  }])
  
  .controller('SearchHotelsController', ['$scope', 'packages', '$routeParams', 'sharedProperties',
										function($scope, packages, $routeParams, sharedProperties){	
	packages.find($routeParams.pid, function(singlepackage) {
		$scope.singlepackage = singlepackage;
	});
	
	
	
  }])
  
  .controller('SearchHotelsResultsController', ['$scope', 'packages', 'hotels', '$routeParams', 'sharedProperties', function($scope, packages, hotels, $routeParams, sharedProperties){
		
		packages.find($routeParams.pid, function(singlepackage) {
			$scope.singlepackage = singlepackage;
		});
		
		hotels.search ($routeParams.hotelCity, $routeParams.hotelState, $routeParams.startMonth+"/"+$routeParams.startDay+"/"+$routeParams.startYear, $routeParams.endMonth+"/"+$routeParams.endDay+"/"+$routeParams.endYear, function(results){
			$scope.hotelResults = results;
			console.log($scope.hotelResults);
		});
		sharedProperties.setStartDate($routeParams.startMonth+"/"+$routeParams.startDay+"/"+$routeParams.startYear);
		sharedProperties.setEndDate($routeParams.endMonth+"/"+$routeParams.endDay+"/"+$routeParams.endYear);
  }])
	
  .controller('HotelBookController', ['$scope', 'packages', '$routeParams', 'sharedProperties', function($scope, packages, $routeParams, sharedProperties){
		
		packages.find($routeParams.pid,  function(singlepackage) {
			$scope.singlepackage = singlepackage;
		});
		
		sharedProperties.setHotelId($routeParams.hid);
		sharedProperties.setRoomTypeCode($routeParams.roomTypeCode);
		sharedProperties.setRateCode($routeParams.rateCode);
		sharedProperties.setChargeableRate($routeParams.chargeableRate);
		$scope.saveEmail = function (item, event) {
			sharedProperties.setEmail($scope.bookemail);
		}
  }])
  .controller('HotelBookConfirmController', ['$scope', 'hotels',  'sharedProperties', function($scope, hotels, sharedProperties){
		
		hotels.book(sharedProperties.getHotelId(), sharedProperties.getRoomTypeCode(), sharedProperties.getRateCode(),
		 sharedProperties.getChargeableRate(), sharedProperties.getStartDate(), sharedProperties.getEndDate(), sharedProperties.getEmail(), function(booking){
			$scope.booking = booking;
		});
  }])