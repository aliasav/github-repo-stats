/* web module is defined here */
/* Define all states here using angular-ui router */
/* Do not define any controllers/services/utilities here, all controllers/services/utilities must go in their specific modules */

(function(){
	
	angular.module('githubRepoStats', [
		'githubRepoStats.controllers',
		'ngCookies',
		'ui.bootstrap',
		'ngAnimate',
	])

	// Changing interpolation start/end symbols.
	.config(function($interpolateProvider, $httpProvider){
		
		$interpolateProvider.startSymbol('[[').endSymbol(']]');
      	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

 	})

	// CSRF token setting
	.run(function($http, $cookies){
		
		$http.defaults.headers.common['X-CSRFToken'] = $cookies['csrftoken'];
		$http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
	})


	// urls with constant SERVER are used, by default set to development urls
	// changed to production urls while ansible deployment

	// Add development/testing/staging server domains
	// do not modify these patterns
	// if modifying, also make corresponding changes in app_js_settings.sh in ops as well
	.constant("DOMAIN", {
		server1: "http://localhost:8000/",
		server: "https://agile-fortress-98198.herokuapp.com/",
		server2: "https://agile-fortress-98198.herokuapp.com/",
 
	})

	// All crm api urls go here
	// DO NOT hard code these urls anywhere in the project
	.constant("API_URLS", {	 
		getStats: "get_stats/", 
	})

;})();
