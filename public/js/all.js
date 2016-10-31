(function () {
    'use strict';
    angular
        .module('tsh', [])
        .config(config);

    config.$inject = ['$compileProvider'];

    function config($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    }


}());

(function () {
    'use strict';

    angular
        .module('tsh')
        .filter('makeRange', makeRange);

    function makeRange() {
        return function(input) {
            var lowBound, highBound;
            switch (input.length) {
				case 1:
					lowBound = 0;
					highBound = parseInt(input[0]) - 1;
					break;
				case 2:
					lowBound = parseInt(input[0]);
					highBound = parseInt(input[1]);
					break;
				default:
					return input;
            }
            var result = [];
            for (var i = lowBound; i <= highBound; i++)
			{
                result.push(i);
			}
            return result;
        };
	}
})();
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
(function(){
  'use strict';
  angular
    .module('tsh')
    .directive('modalDialog',modalDialog);

  function modalDialog(){

    return {
      restrict: 'E',
      scope: {
        show: '='
      },
      replace: true,
      transclude: true, 
      link: function(scope, element, attrs) {
        scope.hideModal = function() {
          scope.show = false;
        };
      },
      templateUrl: 'directive/modalDialog.html' // See below
    };

    }
}());
(function () {
    'use strict';
    angular
        .module('tsh')
        .controller('MainController', MainController);

    MainController.$inject = ['APIhandler'];

    function MainController(APIhandler) {
        var vm = this;

        vm.search = search;
        vm.reset = reset;
        vm.prev = prev;
        vm.next = next;
        vm.openModal = openModal;
        vm.APIhandler = APIhandler;
        vm.page = 0;
        vm.modal = {};
        vm.modalShown=false;

        function search(page) {
            var params = {
                query: vm.suppliers,
                rating: vm.rate,
                page: page ? page : 0
            };
            vm.page = page ? page : 0;
            APIhandler.get(params);
        }
        function prev(){
            search(Math.max(0, --vm.page));
        }
        function next(){
            search(++vm.page);
        }
        function reset () {
            vm.suppliers = "";
            vm.rate = '';
        }
        function openModal(i) {
            vm.modal = APIhandler.payments[i];
            vm.modalShown = !vm.modalShown;
        }

        search();
    }

}());

