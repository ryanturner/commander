'use strict';
angular.module('main')
.controller('SettingsCtrl', function ($scope, $log, Device) {
  $scope.devices = Device.list();
  $scope.device = Device.get();
  $scope.setDevice = Device.set;
  $log.log('Hello from your Controller: SettingsCtrl in module main:. This is your controller:', this);

});
