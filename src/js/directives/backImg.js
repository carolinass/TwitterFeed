"use strict";

app.directive('backImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(url) {
            element.css({
                'background-image': 'url(' + url +')',
	            'background-size' : 'cover',
	            '-webkit-background-size': 'cover',
	    		'-moz-background-size': 'cover',
	    		'background-size': 'cover',
	    		'-o-background-size': 'cover'
            });
        });
    };
});
