/* All controllers go in this file */
/* Keep controllers as slim as possible */
/* Separate out as much as possible and include make services out of them. */ 
/* Naming convention for controllers: 'nameController'. A standard convention will make it easier to search for required controllers. */

(function(){

    angular.module('githubRepoStats.controllers', [])

    // home controller
    .controller("homeController", function($scope, $http, DOMAIN, API_URLS, $window, $location, $rootScope, $anchorScroll){

        $scope.url = "";
        $scope.flags = {
            loading: false,
            success: false,
            error: false,
        };

        $scope.getStats = function(){

            var re = /^(http[s]?:\/\/){0,1}([www]\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

            if (!re.test($scope.url)){
                alert("Enter a valid URL please!");
            }
            else{
                
                var data = {
                    url: $scope.url,
                };

                // show loading gif
                $scope.flags.loading = true;

                // make post request to server
                $http.post(DOMAIN.server + API_URLS.getStats, data)
                // api returned successful results                
                .success(function(data, status, headers, config){

                    if (status===200){
                        // update flags
                        $scope.flags.loading = false;
                        $scope.stats = data;
                        $scope.flags.success = true;
                        $scope.flags.error = false;

                        $location.hash('stats');                          
                        $anchorScroll();

                    }                    
                })
                .error(function(data, status, headers, config){
                    
                    // update flags
                    $scope.flags.loading = false;
                    $scope.flags.success = false;
                    $scope.flags.error = true;
                });
            }
        }
        
    })
    
    

;})();