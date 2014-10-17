var app = angular.module('textSupport', ['ngRoute', 'firebase', 'ngSanitize']);

app.config(['$routeProvider', function($routeProvider, $sceDelegateProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'templates/homeView.html'
	})
	.when('/support',{
		templateUrl: 'templates/supportView.html',
		controller: 'supportCtrl'
	})
	.when('/support/resources/:resourcename', {
		template: '<object class="object" data="{{content}}" type="application/pdf" ></object>',
		controller: 'resourceCtrl',
		resolve:{
			resource: function(textSupportService, $route, $sce){
				return textSupportService.getResource($route.current.params.resourcename)
				.then(function(response){
					var file = new Blob([response], {type: 'application/pdf'});
        			var fileURL = URL.createObjectURL(file);
        			console.log(fileURL);
        			return fileURL;
				});	
			}
		}
		
		


	})
	.otherwise({
		redirectTo: '/'
	});
}])