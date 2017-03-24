"use strict";

/**
 * Controls the login page.
 *
 * @class     LoginCtrl
 * @constructor
 * @param {Object} $http
 * @param {Object} $state
 * @param {Object} $localStorage
 * @param {Object} LoginService       The Angular Service of Login.
 *
 **/
app.controller("LoginCtrl", [ '$http', '$state', '$localStorage', 'LoginService', 
		function($http, $state, $localStorage, LoginService) {

	var self = this;

	/**
	 * Check if the user is authenticated.
	 **/
	self.isAuthenticated = function() {
		return $localStorage.isAuthenticated;
	};

	/**
	 * Check if the user's PIN is being required.
	 **/
	self.pinIsRequired = function() {
		return $localStorage.pinIsRequired;
	};

	/**
	 * Request a authenticated token.
	 **/
	self.codebirdAuthentication = function() {
		LoginService.codebirdAuthentication();
	};

	/**
	 * Sends the PIN to complete authorization proccess.
	 **/
	self.setPinNumber = function() {
		LoginService.setPinNumber(self.pin);
	};

	/**
	 * Check if a user is authenticated.
	 **/
	self.signOut = function() {
		$localStorage.pinIsRequired = false;
		$localStorage.isAuthenticated = false;
		$localStorage.oauth_token = undefined;
		$localStorage.oauth_token_secret = undefined;
		$state.go('login');
	};

	/**
	 * Reload current page.
	 **/
	self.reloadPage = function(){
		$state.reload();
	};

}]);