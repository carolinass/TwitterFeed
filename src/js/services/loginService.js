"use strict";

var app = angular.module('TwitterFeed');

/**
 * A service to login, logout, post twitter, get twitter feed and check auth status.
 *
 * @class     LoginService
 * @static
 * @param {Object} $http
 */
app.service('LoginService', ['$http', function($http) {

	var self = this;
    self.cb = new Codebird;

    self.isAuthenticated = function() {
        return localStorage.isAuthenticated;
    };

    self.pinIsRequired = function() {
        return localStorage.pinIsRequired;
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
                            localStorage.pinIsRequired = true;
                        }
                    );
                }
            }
        );
    };

    self.loadFeed = function() {
        self.cb.__call(
            "statuses_homeTimeline",
            {},
            function (reply, rate, err) {
                console.log(reply);
                console.log(err);
            }
        );
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
                    // store the authenticated token, which may be different from the request token (!)
                    self.cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                    self.loadFeed();
                }
            }
        );
    };
}]);