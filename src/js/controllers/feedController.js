"use strict";

app.controller("FeedCtrl", [ '$http', '$state', '$localStorage', '$rootScope', 
		function($http, $state, $localStorage, $rootScope) {

	var self = this;

	self.cb = new Codebird;
	self.userIsTyping = false;
	self.newTweet = "";

	self.loadFeed = function() {
		self.cb.setConsumerKey(YOUR_API_KEY, YOUR_API_SECRET);
		self.cb.setToken($localStorage.oauth_token, $localStorage.oauth_token_secret);

		self.cb.__call(
		    "statuses_homeTimeline",
		    {},
		    function (reply, rate, err) {
		    	console.log(reply);
		    	$rootScope.$apply(self.feed = reply);
		    }
		)
	};
	self.loadFeed();

	self.loadUser = function() {
		self.cb.__call(
		    "account_verifyCredentials",
		    {},
		    function (reply) {
		    	console.log(reply);
		    	$rootScope.$apply(self.user = reply);
		    }
		);
	};
	self.loadUser();

	self.postTweet = function() {
		self.cb.__call(
		    "statuses_update",
		    {"status": self.newTweet},
		    function (reply, rate, err) {
		        self.newTweet = "";
		    }
		);
	};

	self.setUserTypingStatus = function(status) {
		self.userIsTyping = status;
	};

	self.newTweetIsValid = function() {
		return (self.newTweet.length > 0 || self.userIsTyping);
	};

}]);