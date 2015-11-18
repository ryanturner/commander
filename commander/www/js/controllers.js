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

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.bluetoothDevices = [{"name":"test device"}, {"name":"test device 2"}];
});
