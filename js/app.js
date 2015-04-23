var scotchApp = angular.module('scotchApp', ['ngRoute']);
//Configure our routes
scotchApp.config(function($routeProvider) {
	$routeProvider	
	.when('/', {
		templateUrl : 'register.html',
		controller  : 'mainController'
	})
	.when('/send-sms', {
		templateUrl : 'send-sms.html',
		controller  : 'sendSmsController'
	})	
	.when('/edit-profile', {
		templateUrl : 'edit-profile.html',
		controller  : 'editProfileController'
	})
});
//Register Page Controller
scotchApp.controller('sendSmsController', function($scope,$sce,$http) {
	$scope.sendSmsForm = function(ngForm) {
		var dataObj = {
			mobile_num		:	ngForm.mobile.$viewValue,
			message		    :	ngForm.message.$viewValue
		};	
		$http.post(webServiceUrl+'register',dataObj)
		.success(function(response) {
			console.log(response.mobile);
			 if(response.mobile!='0'){
				$scope.modile = response.mobile;
				$scope.userName = response.user_name;
				sessionStorage.setItem( 'user_name', JSON.stringify($scope.userName) );
				sessionStorage.setItem( 'mobile', JSON.stringify($scope.modile) );
				// window.location="#/account";
				alert('sucess');return false;
			}else{
			  $scope.errorLoginMessage=Login_error_message;
			 }
		});
	}
});
scotchApp.controller('editProfileController', function($scope,$sce,$http) {
	$scope.user_id = {};
	$scope.mobile = {};
	$scope.username = {};
	$scope.updForm = function(ngForm) {
	$scope.user_id 		= 	JSON.parse(sessionStorage["user_id"]);
		var dataObj = {
			username		:	ngForm.username.$viewValue,
			mobile_num		:	ngForm.mobile.$viewValue,
			fax		        :	ngForm.fax.$viewValue,
			address		    :	ngForm.address.$viewValue
		};	
		$http.put(webServiceUrl+'register/'+$scope.user_id,dataObj)
		.success(function(response) {
			 if(response.value!='0'){	
				window.location="#/edit-profile";
			}else{
			  $scope.errorLoginMessage=Login_error_message;
			 }
		});
	}
	if(typeof sessionStorage["user_id"]!='undefined'){
		$scope.user_id 		= 	JSON.parse(sessionStorage["user_id"]);
		//$scope.mobile 		= 	JSON.parse(sessionStorage["mobile"]);
		//$scope.username 	= 	JSON.parse(sessionStorage["user_name"]);
		$http.get(webServiceUrl+'register/'+$scope.user_id)	
		.success(function(response) {
			$scope.results = [response.data];				
		});
	}
	
});
scotchApp.controller('mainController', function($scope,$sce,$http) {
	$scope.regForm = function(ngForm) {
		var dataObj = {
			username		:	ngForm.username.$viewValue,
			mobile_num		:	ngForm.mobile.$viewValue,
			fax		        :	ngForm.fax.$viewValue,
			address		    :	ngForm.address.$viewValue
		};	
		$http.post(webServiceUrl+'register',dataObj)
		.success(function(response) {
			 if(response.mobile!='0'){
				$scope.modile = response.mobile;
				$scope.userName = response.user_name;
				$scope.user_id = response.user_id;
				sessionStorage.setItem( 'user_name', JSON.stringify($scope.userName) );
				sessionStorage.setItem( 'mobile', JSON.stringify($scope.modile) );
				sessionStorage.setItem( 'user_id', JSON.stringify($scope.user_id) );
				window.location="#/edit-profile";
			}else{
			  $scope.errorLoginMessage=Login_error_message;
			 }
		});
	}
});