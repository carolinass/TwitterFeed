describe('Login Testing', function() {
	beforeEach(module('TwitterFeed'));
	var scope, LoginCtrl;
	beforeEach(inject(function ($rootScope, $controller) {
		scope = $rootScope.$new();
		LoginCtrl = $controller('LoginCtrl', {$scope: scope});
	}));
	
	it('pin should not be required', function() {
		LoginCtrl.signOut();
		expect(LoginCtrl.pinIsRequired()).toEqual(false);
	});

	it('pin should not be required', function() {
		LoginCtrl.signOut();
		expect(LoginCtrl.isAuthenticated()).toEqual(false);
	});

});