"use strict";

app.directive('backImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(url) {
            if (url.length > 0) {
                element.css({
                    'height' : '300px',
                    'background-image': 'url(' + url +')',
                    'background-size' : 'cover',
                    '-webkit-background-size': 'cover',
                    '-moz-background-size': 'cover',
                    'background-size': 'cover',
                    '-o-background-size': 'cover'
                });
            } else {
                element.css({
                    'background-color': '#1DA1F2',
                    'height' : '100px'
                });
            }
        });
    };
});
