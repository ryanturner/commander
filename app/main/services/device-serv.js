'use strict';
angular.module('main')
.factory('Device', function ($log, $cordovaBluetoothSerial) {
  var Device = {};
  var list = [
    {
      name: 'Test1',
      uid: '123'
    },
    {
      name: 'Test2',
      uid: '123'
    },
    {
      name: 'Test3',
      uid: '123'
    }
  ];
  var selectedDevice = list[0];
  Device.get = function() {
    return selectedDevice;
  };
  Device.set = function(device) {
    selectedDevice = device;
    $log.log(selectedDevice.name);
  };
  Device.list = function() {
    return list;
  };
  return Device;
});
