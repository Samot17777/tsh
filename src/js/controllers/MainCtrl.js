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

