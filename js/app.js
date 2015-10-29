angular.module("myapp", [])
 		.controller('MyCtrl', function($scope,$http) {
            
            $scope.search=function(){
             $scope.submitted=true;
           if($scope.myForm.$valid){
             var tag = $scope.searchField;

                $scope.images = null;
                
                $scope.searchField = "";
                 getImagesFor(tag);
	           }
            }


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
                    console.log(result.data[0]);
                    $scope.images = result.data;
                   
                } else {
                    var message = "There was an error. Code: " + result.meta.code + ". Type: " + result.meta.error_type + ". Message: " + result.meta.error_message;
                    
                }
            }).error(function() {
                
            });

	            }
            $scope.hasError = function (field, validation) {
            if (! $scope.submitted) {
                return false;
            }

            if (validation == undefined) {
                validation = "required";
            }

            return $scope.myForm[field].$error[validation];
        };

});
