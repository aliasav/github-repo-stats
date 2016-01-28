/* All controllers go in this file */
/* Keep controllers as slim as possible */
/* Separate out as much as possible and include make services out of them. */ 
/* Naming convention for controllers: 'nameController'. A standard convention will make it easier to search for required controllers. */

(function(){

    angular.module('githubRepoStats.controllers', [])

    // home controller
    .controller("homeController", function($scope, $http, DOMAIN, API_URLS){

        $scope.url = "";
        $scope.loadingFlag = false;
        $scope.success = false;

        $scope.getStats = function(){

            var re = /^(http[s]?:\/\/){0,1}([www]\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

            if (!re.test($scope.url)){
                alert("Enter a valid URL please!");
            }
            else{
                
                var data = {
                    url: $scope.url,
                };

                $scope.loadingFlag = true;

                $http.post(DOMAIN.server + API_URLS.getStats, data)
                .success(function(data, status, headers, config){
                    console.info(data);
                    $scope.loadingFlag = false;
                    $scope.stats = data;
                    $scope.success = true;
                })
                .error(function(data, status, headers, config){
                    console.info(data);
                    $scope.loadingFlag = false;
                    $scope.success = false;
                });
            }
        }
        
    })
    
    

;})();