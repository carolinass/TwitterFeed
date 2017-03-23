"use strict";

var app = angular.module('TwitterFeed');

app.run(['$rootScope', '$state', function($rootScope, $state) {
    angular.element(document).ready(function () {
        if (localStorage.isAuthenticated) {
            $state.go("home");
        } else {
            $state.go("login");
        }
    });
}]);