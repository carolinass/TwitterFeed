"use strict";

app.controller("LoginCtrl", [ '$http', '$state', '$localStorage', 'LoginService', 
		function($http, $state, $localStorage, LoginService) {

	var self = this;

	self.isAuthenticated = function() {
		return $localStorage.isAuthenticated;
	};

	self.pinIsRequired = function() {
		return $localStorage.pinIsRequired;
	};

	self.codebirdAuthentication = function() {
		LoginService.codebirdAuthentication();
	};

	self.setPinNumber = function() {
		LoginService.setPinNumber(self.pin);
	};

	self.signOut = function() {
		$localStorage.pinIsRequired = false;
		$localStorage.isAuthenticated = false;
		$localStorage.oauth_token = undefined;
		$localStorage.oauth_token_secret = undefined;
		$state.go('login');
	};

	self.reloadPage = function(){
		$state.reload();
	};

}]);