/**
 * Created by kpihus on 21/12/15.
 */
var pdControllers = angular.module('pdControllers', []);

pdControllers.controller('SidebarController', ['$scope', 'COM', 'conf',
	function($scope, COM, conf) {
		COM.get('/v1/persons', {
				start: 0,
				api_token: conf.apikey
			})
			.success(function(data) {

				$scope.contacts = data.data;
				console.log($scope.contacts); //TODO: Remove
			})
			.error(function() {
				alert("Error")
			});

		$scope.setDetails = function(item) {
			var lastActivityId = item.last_activity_id;
			var nextActitityId = item.next_activity_id;

			$scope.detail = {
				name: item.first_name + ' ' + item.last_name,
				vals: {
					'Phone': item.phone[0].value,
					'E-mail': item.email[0].value,
					'Added': item.add_time,
					'Open deals': null,
					'Next activity': null,
					'Last activity': null
				}
			};
			$scope.deals = [];

			COM.get('/v1/persons/' + item.id + '/deals', {
					start: 0,
					api_token: conf.apikey
				})
				.success(function(data) {

					$scope.detail.vals['Open deals'] = data.data.length;
					for(var i=0; i<data.data.length; i++){
						$scope.deals.push({
							title: data.data[i].title,
							sum: data.data[i].value
						})
					}
				})
				.error(function(){alert('Error')});

			COM.get('/v1/persons/'+item.id+'/activities',{
				start: 0,
				api_token: conf.apikey
			})
				.success(function(data){
					console.log(data); //TODO: Remove
					if(data.data) {
						for(var i = 0; i < data.data.length; i++) {
							if(data.data[i].id == lastActivityId) {
								$scope.detail.vals['Last activity'] = data.data[i].subject;
							} else if(data.data[i].id == nextActitityId) {
								$scope.detail.vals['Next activity'] = data.data[i].subject;
							}
						}
					}else{
						$scope.detail.vals['Last activity'] = 'None';
						$scope.detail.vals['Next activity'] = 'None'
					}
				})
				.error(function(){alert('Error')});




		}

	}]);