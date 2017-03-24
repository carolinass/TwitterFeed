"use strict";

/**
 * A service to login, logout, post twitter, get twitter feed and check auth status.
 *
 * @class     LoginService
 * @static
 * @param {Object} $http
 */
app.service('LoginService', ['$http', '$localStorage', '$rootScope', '$state', 'toastr',
    function($http, $localStorage, $rootScope, $state, toastr) {

	var self = this;
    self.cb = new Codebird;

    self.codebirdAuthentication = function() {
        self.cb.setConsumerKey(YOUR_API_KEY, YOUR_API_SECRET);
        // gets a request token
        self.cb.__call(
            "oauth_requestToken",
            {oauth_callback: "oob"},
            function (reply,rate,err) {
                if (err) {
                    console.log("error response or timeout exceeded" + err.error);
                    return false;
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
                            $rootScope.$apply($localStorage.pinIsRequired = true);
                        }
                    );
                }
            }
        );
    };

    self.setPinNumber = function(pin) {
        self.cb.__call(
            "oauth_accessToken",
            {oauth_verifier: pin},
            function (reply,rate,err) {
                if (reply.httpstatus === 200) {
                    self.cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                    $localStorage.oauth_token = reply.oauth_token;
                    $localStorage.oauth_token_secret = reply.oauth_token_secret;
                    $localStorage.isAuthenticated = true;
                    $state.go('feed');
                } else {
                    $rootScope.$apply($localStorage.pinIsRequired = true);
                    toastr.error('Something went wrong :(', 'Ooops!');
                    $state.reload();
                }
            }
        );
    };

    self.pinIsRequired = function() {
        return $localStorage.pinIsRequired;
    };

}]);