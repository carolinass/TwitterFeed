app.controller("LoginCtrl", [ '$http', '$state', 'LoginService', function($http, $state, LoginService) {

	var self = this;

	self.isAuthenticated = function() {
		return LoginService.isAuthenticated();
	};

	self.pinIsRequired = function() {
		console.log("check");
		return LoginService.pinIsRequired();
	};

	self.codebirdAuthentication = function() {
		LoginService.codebirdAuthentication();
	};

	self.loadFeed = function() {
		LoginService.loadFeed();
	};

	self.setPinNumber = function() {
		LoginService.setPinNumber();
	};

}]);