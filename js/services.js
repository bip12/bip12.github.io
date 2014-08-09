'use strict';

/* Services */
// http://blooming-dusk-7345.herokuapp.com
// http://127.0.0.1:9000/agentapp/packages/
angular.module('travelApp.services', [])
  .factory('packages', function($http){
    return {
		list: function (callback) {
			$http({
				method: 'GET',
				url: 'http://blooming-dusk-7345.herokuapp.com/agentapp/packages/',
				cache: true
			}).success(callback);
		},
		find: function (id, callback){
			$http({
				method: 'GET',
				url: 'http://blooming-dusk-7345.herokuapp.com/agentapp/packages/'+id,
				cache: true
			}).success(callback);
		},
		create: function (name, desc, SDate, EDate, Type, token, callback){
			var payload = {
				"package_name": name, 
				"description": desc, 
				"start_date": SDate, 
				"end_date": EDate, 
				"package_type": Type, 
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
				headers:{"Authorization":"JWT "+token}
			}).success(callback);
		}
	};
  })
  
  .factory('JWTtoken', function($http){
   return {
		getToken: function () {
			return $http({
				method: 'POST',
				url: 'http://blooming-dusk-7345.herokuapp.com/api-token-auth/',
				data: {"username":"bipul", "password":"cmpe295"}
			}).success(function(result){
				return result;
			});
		}
   };
  })
  
  .factory('hotels', function($http, JWTtoken){
	return{
		search: function(city, state, startDate, endDate, callback){
			$http({
				method: 'GET',
				url: 'http://blooming-dusk-7345.herokuapp.com/agentapp/hotels/?city='+city+'&state='+state+'&startDate='+startDate+'&endDate='+endDate,
				cache: true
			}).success(callback);
		},
		book: function(hotelId, roomTypeCode, rateCode, chargeableRate, startDate, endDate, email, callback){
			var payload = {
			"hotelId": hotelId,
			"arrivalDate": startDate,
			"departureDate": endDate,
			"supplierType": "E",
			"roomTypeCode": roomTypeCode,
			"rateCode": rateCode,
			"chargeableRate": chargeableRate,
			"room1": "2",
			"room1FirstName": "test", 
			"room1LastName": "tester", 
			"room1BedTypeId": "23",
			"room1SmokingPreferece": "NS",
			"email": email,
			"firstName": "test", 
			"lastName": "tester",
			"city": "Seattle", 
			"stateProvinceCode": "WA", 
			"countryCode": "US", 
			"postalCode": "98004"
			};
			JWTtoken.getToken().then(function(result){
				var token = result.data.token;
				$http({
					url:"http://blooming-dusk-7345.herokuapp.com/agentapp/hotel-reservation/",
					method: "POST",
					data: payload,
					headers:{"Authorization":"JWT "+token}
				}).success(callback);
			});
			
		}
	};
  })
  
  .factory('sharedProperties', function(){
	var package_name = '';
	var description ='';
	var end_date = '';
	var start_date = '';
	var package_type = '';
	//------------------------------
	var hotelId = '';
	var roomTypeCode = '';
	var rateCode = '';
	var chargeableRate = '';
	var token = '';
	var startDate = '';
	var endDate = '';
	var email = '';
        return {
			
			setPackage_type: function(value) {
				package_type = value;
			},
			getPackage_type: function(){
				return package_type;
			},
			setPackage_name: function(value) {
				package_name = value;
			},
			getPackage_name: function(){
				return package_name;
			},
			setDescription: function(value) {
				description = value;
			},
			getDescription: function(){
				return description;
			},
			setEnd_date: function(value) {
				end_date = value;
			},
			getEnd_date: function(){
				return end_date;
			},
			setStart_date: function(value) {
				start_date = value;
			},
			getStart_date: function (){
				return start_date;
			},
			setHotelId: function(value) {
                hotelId = value;
            },
            getHotelId: function () {
                return hotelId;
            },
            setRoomTypeCode: function(value) {
                roomTypeCode = value;
            },
			getRoomTypeCode: function () {
                return roomTypeCode;
            },
            setRateCode: function(value) {
                rateCode = value;
            },
			getRateCode: function () {
                return rateCode;
            },
            setChargeableRate: function(value) {
                chargeableRate = value;
            },
			getChargeableRate: function () {
                return chargeableRate;
            },
            setToken: function(value){
				token = value;
			},
			getToken: function(){
				return token;
			},
			setStartDate: function(value){
				startDate = value;
			},
			getStartDate: function(){
				return startDate;
			},
			setEndDate: function(value){
				endDate = value;
			},
			getEndDate: function(){
				return endDate;
			},
			setEmail: function(value){
				email = value;
			},
			getEmail: function(){
				return email;
			}		
        };
  })	
  .value('version', '0.1');