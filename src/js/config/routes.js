'use strict';

var app = angular.module('TwitterFeed');

app.config( [ '$stateProvider', '$urlRouterProvider', function ( $stateProvider, $urlRouterProvider ) {
    $stateProvider
        .state( 'base', {
            url: '',
            views: {
                header: {
                    templateUrl: 'src/views/partials/header.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'ctrl'
                },
                main: {
                    templateUrl: ''
                },
                footer: {
                    templateUrl: 'src/views/partials/footer.html'
                }
            }
        } )
        .state( 'login', {
            url: '/login',
            parent: 'base',
            views: {
                main: {
                    templateUrl: 'src/views/auth/login.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'ctrl'
                }
            }
        } )
        .state( 'feed', {
            url: '/feed',
            parent: 'base',
            views: {
                main: {
                    templateUrl: 'src/views/pages/feed.html',
                    controller: 'FeedCtrl',
                    controllerAs: 'ctrl'
                }
            }
        } );
    $urlRouterProvider.otherwise( 'login' );
} ] );