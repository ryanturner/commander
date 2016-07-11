'use strict';
angular.module('main')
.controller('MenuCtrl', function ($scope, $log, lodash, $ionicModal, Device) {
  $scope.$watch( function () { return Device.get(); }, function (data) {
    $scope.device = data;
  }, true);
});
