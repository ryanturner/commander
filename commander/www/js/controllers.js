angular.module('starter.controllers', ['ngCordova', 'ui.router'])

.controller('DashCtrl', function($scope, $ionicPlatform, $cordovaBluetoothSerial, $state, Button, Trigger) {
  $scope.buttons = [
    new Button("Test Button", new Trigger([2], null, null, true, false)),
    new Button("Test Button 2", new Trigger([3], null, null, true, false))
  ];
  $scope.listSettings = {
    canSwipe: true,
    showReorder: false,
    showDelete: false
  };
})

.controller('AccountCtrl', function($scope, $ionicPlatform, $cordovaBluetoothSerial) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.bluetoothDevices = [""];

  $ionicPlatform.ready(function() {
    console.log("ready");
    if(typeof $cordovaBluetoothSerial != "undefined") {
      $cordovaBluetoothSerial.list().then(function(result){
        $scope.bluetoothDevices = result;
      },
      function(error) {
        console.log(error);
      });
    }
  });
});
