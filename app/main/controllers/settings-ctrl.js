'use strict';
angular.module('main')
.controller('SettingsCtrl', function ($scope, $log, Device) {
  Device.fetchList();
  $scope.device = Device.selected();
  $scope.setDevice = Device.set;

  $scope.$watch( function () { return Device.list; }, function (data) {
    $scope.devices = data;
  }, true);

});
