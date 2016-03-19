(function () {
    'use strict';
 angular.module('myapp')
 	.controller("MyCtrl",  function($scope,$http,growl) {
            
        $scope.search=function(){
                if(!$scope.myForm.$valid){
            return;
            }


             var tag = $scope.searchField;
             $scope.searchMessage=tag;

                $scope.images = null;
                $scope.myForm.$setPristine();
                $scope.searchField = "";
               // growl.addInfoMessage("Searching Instagram for photos tagged with '" + tag + "'");
                getImagesFor(tag);
                 
	           };
            


	   function getImagesFor(tag) {
            var base = "https://api.instagram.com/v1";
            var clientId = 'f6cc2648dbeb4bd48e29345ccd594605';

            var request = '/tags/' + tag + '/media/recent';
            var url = base + request;
            var config = {
                'params': {
                    'client_id': clientId,
                    'count': 12,
                    'callback': 'JSON_CALLBACK'
                }
            };
             $http.jsonp(url, config).success(function (result) {
                if (result.meta.code == 200) {
                    
                    $scope.images = result.data;
                    growl.addInfoMessage("We found " + result.data.length + " results for '" + tag + "' tag.");
                   
                } else {
                    var message = "There was an error. Code: " + result.meta.code + ". Type: " + result.meta.error_type + ". Message: " + result.meta.error_message;
                    growl.addErrorMessage(message, { ttl: 5000 });
                }
            }).error(function() {
                
            });

	       }
           

});
})();

