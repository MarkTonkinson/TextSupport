var app = angular.module('textSupport');

app.controller('supportCtrl', function($scope, $firebase, textSupportService){

	$scope.getNumbers = function() {
		$scope.numbers = $firebase(new Firebase('https://mttextsupport.firebaseio.com/numbers')).$asArray()
		console.log($scope.numbers);


	}
	$scope.getNumbers();
	
	
	
	// $scope.response = function () {

 //    	console.log($scope.responseMessage);
	// // }
	// $scope.content = resource;

	$scope.response = function(number ,responseMessage){

		$scope.responseMessage = responseMessage; //response message is already defining itself as an object in the view
		//console.log($scope.responseMessage);
		console.log(number +'this is the number');
		//console.log(responseMessage);
		debugger;
		textSupportService.postResponse(number.replace(' ','+'), $scope.responseMessage)
		.then(function(response){
			console.log(response + 'This is the response')
			debugger;
			$scope.addReply = $firebase(new Firebase('https://mttextsupport.firebaseio.com/numbers/' + number)).$asArray();//new firebase array to post the response to?
			$scope.addReply.$add(response.data);
			$scope.responseMessage = '';
			$scope.getNumbers();
		});
	}	

})