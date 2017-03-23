"use strict";

var app = angular.module('TwitterFeed');

/**
 * A service to login, logout, post twitter, get twitter feed and check auth status.
 *
 * @class     LoginService
 * @static
 * @param {Object} $http
 */
app.service('LoginService', ['$http', '$localStorage', function($http, $localStorage) {

	var self = this;

    self.codebirdAuthentication = function(cb) {
        cb.setConsumerKey(YOUR_API_KEY, YOUR_API_SECRET);
        // gets a request token
        cb.__call(
            "oauth_requestToken",
            {oauth_callback: "oob"},
            function (reply,rate,err) {
                if (err) {
                    console.log("error response or timeout exceeded" + err.error);
                    return false;
                }
                if (reply) {
                    // stores it
                    cb.setToken(reply.oauth_token, reply.oauth_token_secret);

                    // gets the authorize screen URL
                    return cb.__call(
                        "oauth_authorize",
                        {},
                        function (auth_url) {
                            window.codebird_auth = window.open(auth_url);
                            $localStorage.cb = cb;
                            return true;
                        }
                    );
                }
            }
        );
    };

    self.loadFeed = function(cb) {
        cb.__call(
            "statuses_homeTimeline",
            {},
            function (reply, rate, err) {
                console.log(reply);
                console.log(err);
            }
        );
    };

    self.setPinNumber = function(cb) {
        return cb.__call(
            "oauth_accessToken",
            {oauth_verifier: self.pin},
            function (reply,rate,err) {
                if (err) {
                    console.log("error response or timeout exceeded" + err.error);
                    return false;
                }
                if (reply) {
                    // store the authenticated token, which may be different from the request token (!)
                    cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                    $localStorage.isAutheticated = true;
                    $localStorage.cb = cb;
                    return cb;
                }
            }
        );
    };
}]);