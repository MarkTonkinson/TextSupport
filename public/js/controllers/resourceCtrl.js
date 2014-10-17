var app = angular.module('textSupport');

app.controller('resourceCtrl', function($scope, resource, textSupportService, $sce){
	
	$scope.content = resource;
	console.log($scope.content);

	})