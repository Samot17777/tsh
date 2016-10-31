(function () {
    'use strict';

    angular
        .module('tsh')
        .factory('APIhandler', APIhandler);

    APIhandler.$inject = ['$http'];

    function APIhandler($http) {

		var APIhandler = {
            payments : {},
            pagination: {}
        };
		APIhandler.get = function(params){
			$http.get('http://test-api.kuria.tshdev.io/', { params: params}).then(function(res){
                APIhandler.payments = res.data.payments;
                APIhandler.pagination = res.data.pagination;
			});
		};

	   return APIhandler;
    }
})();