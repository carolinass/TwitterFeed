"use strict";

var app = angular.module('TwitterFeed');

app.controller("FeedCtrl", [ '$http', '$state', '$localStorage', '$rootScope', 
		function($http, $state, $localStorage, $rootScope) {

	this.cb = $localStorage.cb;

	this.loadFeed = function() {
		var self = this;
		this.cb.__call(
		    "statuses_homeTimeline",
		    {},
		    function (reply, rate, err) {
		    	console.log(reply);
		    	$rootScope.$apply(self.feed = reply);
		    }
		)
	};

	this.loadFeed();

}]);