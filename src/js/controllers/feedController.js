"use strict";

/**
 * Controls the feed page.
 *
 * @class     FeedCtrl
 * @constructor
 * @param {Object} $http
 * @param {Object} $state
 * @param {Object} $localStorage
 * @param {Object} $rootScope
 * @param {Object} toastr
 *
 **/
app.controller("FeedCtrl", [ '$http', '$state', '$localStorage', '$rootScope', 'toastr',
	function($http, $state, $localStorage, $rootScope, toastr) {

	var self = this;

	self.cb = new Codebird;
	self.userIsTyping = false;
	self.newTweet = "";
	self.feed = [];

	/**
	 * Load the user's home timeline
	 **/
	self.loadFeed = function() {
		self.feed = [];
		self.cb.setConsumerKey(YOUR_API_KEY, YOUR_API_SECRET);
		self.cb.setToken($localStorage.oauth_token, $localStorage.oauth_token_secret);
		self.cb.__call(
		    "statuses_homeTimeline",
		    {"count" : 50},
		    function (reply, rate, err) {
		    	$rootScope.$apply(self.feed = reply);
		    }
		)
	};
	self.loadFeed();

	/**
	 * Load the user object
	 **/
	self.loadUser = function() {
		self.cb.__call(
		    "account_verifyCredentials",
		    {},
		    function (reply) {
		    	$rootScope.$apply(self.user = reply);
		    }
		);
	};
	self.loadUser();

	/**
	 * Post a new tweet
	 **/
	self.postTweet = function() {
		self.postTweetPromise = self.cb.__call(
		    "statuses_update",
		    {"status": self.newTweet},
		    function (reply, rate, err) {
		        if (err) {
					toastr.error('Something went wrong :(', 'Ooops!');
		        }
		        if (reply) {
		        	$rootScope.$apply(self.newTweet = "");
		        	$rootScope.$apply(self.loadFeed());
		        	toastr.success("You've just tweeted!", 'Yay!');
		        }
		    }
		);
	};

}]);
