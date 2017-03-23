"use strict";

var app = angular.module('TwitterFeed');

app.run(['$rootScope', '$state', '$localStorage', function($rootScope, $state, $localStorage) {
    angular.element(document).ready(function () {
        if ($localStorage.isAuthenticated) {
            $state.go("feed");
        } else {
            $state.go("login");
        }
    });
}]);