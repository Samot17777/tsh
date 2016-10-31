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
