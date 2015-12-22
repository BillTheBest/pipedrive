/**
 * Created by kpihus on 21/12/15.
 */

var pd = angular.module('pd', [
		'pdControllers',
		'pdServices'
	])
	.constant('conf', {
		'apikey': '273d044f20ada98b49e1f8338e118300f6a0bb77',
		'apiurl': 'https://api.pipedrive.com'
	});