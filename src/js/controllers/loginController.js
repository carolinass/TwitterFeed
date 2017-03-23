"use strict";

app.controller("LoginCtrl", [ '$http', '$state', '$localStorage', 'LoginService', 
		function($http, $state, $localStorage, LoginService) {

	var self = this;

	self.cb = new Codebird;
	self.pinIsRequired = false;

	self.isAuthenticated = function() {
		return $localStorage.isAuthenticated;
	};

	self.codebirdAuthentication = function() {
		self.cb.setConsumerKey(YOUR_API_KEY, YOUR_API_SECRET);
        
        // gets a request token
		self.cb.__call(
		    "oauth_requestToken",
		    {oauth_callback: "oob"},
		    function (reply,rate,err) {
		        if (err) {
		            console.log("error response or timeout exceeded" + err.error);
		        }
		        if (reply) {
		            // stores it
		            self.cb.setToken(reply.oauth_token, reply.oauth_token_secret);

		            // gets the authorize screen URL
		            self.cb.__call(
		                "oauth_authorize",
		                {},
		                function (auth_url) {
		                    window.codebird_auth = window.open(auth_url);
		                }
		            );
		        }
		    }
		);

        self.pinIsRequired = true;
        
	};

	self.setPinNumber = function() {
		self.cb.__call(
		    "oauth_accessToken",
		    {oauth_verifier: self.pin},
		    function (reply,rate,err) {
		        if (err) {
		            console.log("error response or timeout exceeded" + err.error);
		        }
		        if (reply) {
		            self.cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                    $localStorage.oauth_token = reply.oauth_token;
                    $localStorage.oauth_token_secret = reply.oauth_token_secret;
                    $localStorage.isAuthenticated = true;
                    $state.go('feed');
		        }
		    }
		);
	};

	self.signOut = function() {
		$localStorage.isAuthenticated = false;
		$localStorage.oauth_token = undefined;
		$localStorage.oauth_token_secret = undefined;
		$state.go('login');
	};

}]);