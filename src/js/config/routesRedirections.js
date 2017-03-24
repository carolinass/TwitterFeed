"use strict";

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