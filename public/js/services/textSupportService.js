var app = angular.module('textSupport');

app.service('textSupportService', function($http){
	this.postResponse = function(number, message){  //the server takes two parameters a phone number to 
		//respond to and a message to pass on that becomes req.body
		
		return $http({
			method: 'POST',
			url: "http://localhost:8899/support/messages/" + number,
			data: message
		}).then(function(response){
			console.log(response);
			return response;
		})
	}

	this.getResource = function(resource_name){ //coming from resolve
		return $http({
		method: 'GET',
		url: 'http://localhost:8899/support/resources/' + resource_name
	}).then(function(response){
		console.log(response);
		return response.data;
	})
	
	}
});