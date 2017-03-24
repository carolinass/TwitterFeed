"use strict";

/**
 * Configures the routes' redirections.
 *
 * @namespace tweetit
 * @param {Object} $stateProvider     A ui.router module's provider to control routing
 *                                    states. It is used here to configure the routes.
 * @param {Object} $urlRouterProvider A ui.router module's provider responsible to
 *                                    watching $location. It is used here to redirect
 *                                    the user to a default route if the accessed route
 *                                    is invalid.
 **/
app.run(['$rootScope', '$state', '$localStorage', function($rootScope, $state, $localStorage) {
    angular.element(document).ready(function () {
        if ($localStorage.isAuthenticated) {
            $state.go("feed");
        } else {
            $localStorage.pinIsRequired = false;
            $state.go("login");
        }
    });

    $rootScope.$on( '$stateChangeSuccess', function ( event, toState, toParams, fromState, fromParams ) {
        if (toState.name === "login"){
            if ($localStorage.isAuthenticated) {
                $state.go("feed");
            } else {
                $localStorage.pinIsRequired = false;
            }
        }
    });
}]);