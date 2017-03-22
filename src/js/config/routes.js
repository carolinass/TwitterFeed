'use strict';

var app = angular.module('TwitterFeed');

app.config( [ '$stateProvider', '$urlRouterProvider', function ( $stateProvider, $urlRouterProvider ) {
    $stateProvider
        .state( 'main', {
            url: '',
            views: {
                header: {
                    templateUrl: 'src/views/general/header.html'
                },
                main: {
                    templateUrl: 'src/views/auth/login.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'ctrl'
                },
                footer: {
                    templateUrl: 'src/views/general/footer.html'
                }
            },
            authenticate: true
        } )
        .state( 'login', {
            url: '/login',
            templateUrl: 'src/views/auth/login.html',
            authenticate: false
        } );
    $urlRouterProvider.otherwise( 'login' );
} ] );