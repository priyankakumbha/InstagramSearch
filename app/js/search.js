'use strict';

angular.module("myapp", ['angular-growl', 'ngAnimate']);

angular.module("myapp").config(['growlProvider', function(growlProvider) {
    growlProvider.globalTimeToLive(3000);
}]);