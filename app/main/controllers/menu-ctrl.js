'use strict';
angular.module('main')
.controller('MenuCtrl', function ($scope, $log, lodash, $ionicModal, Device) {
  Device.loadSelectedDevice();
  $scope.$watch( function () { return Device.selected(); }, function (data) {
    $scope.device = data;
  }, true);
});
