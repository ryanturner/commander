angular.module('starter.controllers', ['ngCordova', 'ui.router'])

.controller('DashCtrl', function($scope, $ionicPlatform, $cordovaBluetoothSerial, $state) {
  $scope.items = [{"id":0,"label":"Test"},{"id":0,"label":"Test"},{"id":0,"label":"Test"}];
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
