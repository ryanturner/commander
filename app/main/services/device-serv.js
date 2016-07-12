'use strict';
angular.module('main')
.factory('Device', function ($log, $cordovaBluetoothSerial, lodash, $localForage, $q) {
  var Device = {
    list: []
  };
  var selectedDeviceId;
  Device.loadSelectedDevice = function () {
    Device.fetchList();
    $localForage.getItem('selectedDeviceId').then(function (data) {
      selectedDeviceId = data;
    });
  };
  Device.selected = function () {
    return lodash.find(Device.list, { id: selectedDeviceId });
  };
  Device.set = function (id) {
    $localForage.setItem('selectedDeviceId', id).then(function () {
      selectedDeviceId = id;
    });
  };
  Device.fetchList = function () {
    return $q(function (resolve, reject) {
      $cordovaBluetoothSerial.list().then(function (result) {
        Device.list = result;
        resolve(result);
      },
      function (error) {
        $log.error(error);
        reject(error);
      });
    });
  };
  return Device;
});
