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