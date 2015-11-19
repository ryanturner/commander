angular.module('starter.controllers', ['ngCordova', 'ui.router'])

.controller('DashCtrl', function($scope, $ionicPlatform, $cordovaBluetoothSerial, $state, Button, Trigger) {
  $scope.buttons = [
    new Button("Test Button", new Trigger([2], null, null, true)),
    new Button("Test Button 2", new Trigger([3], null, null, true))
  ];
  $scope.listCanSwipe = true;
  $scope.shouldShowReorder = true;
  $scope.shouldShowDelete = true;
  $ionicPlatform.ready(function() {
    console.log("ready");
    $scope.liste = function() {
      $cordovaBluetoothSerial.list().then(function(result){
        $scope.btlist = result;
        console.log(result);
        console.log("yay");
      },
      function(error) {
        console.log(error);
      });
    }
  });
  $scope.go = function(path) {
    $state.go(path);
  };
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.bluetoothDevices = [{"name":"test device"}, {"name":"test device 2"}];
});
