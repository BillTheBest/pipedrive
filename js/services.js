/**
 * Created by kpihus on 21/12/15.
 */
var pdServices = angular.module('pdServices', ['ngResource']);

pdServices.factory('COM', ['$http', 'conf',
function($http, conf){
	return{
		get: function(command, param){
			var params ='?';
			for(var item in param){
				params+=item+'='+param[item]+'&';
			}
			return $http({
				method: 'GET',
				url:conf.apiurl+command+params,
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}
	}
}]);