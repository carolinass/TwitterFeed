'use strict';
/**
 * Configures the application's routing system.
 *
 * @namespace tweetit
 * @param {Object} $stateProvider     A ui.router module's provider to control routing
 *                                    states. It is used here to configure the routes.
 * @param {Object} $urlRouterProvider A ui.router module's provider responsible to
 *                                    watching $location. It is used here to redirect
 *                                    the user to a default route if the accessed route
 *                                    is invalid.
 **/
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