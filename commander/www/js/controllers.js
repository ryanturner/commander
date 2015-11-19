angular.module('starter.controllers', ['ngCordova', 'ui.router', 'underscore'])

.controller('DashCtrl', function($scope, $ionicPlatform, $cordovaBluetoothSerial, $state, Button, Trigger, DeviceState) {
  var deviceState = new DeviceState(2, 8, true);
  var buttons;
  var buttonTriggerChangedCallback = function(button) {
    deviceState.setPortsWithTrigger(button.trigger);
    _.each(button.trigger.activateButtons, function(buttonToActivate) {
      buttons[buttonToActivate].trigger.isActive = button.trigger.isActive;
      deviceState.setPortsWithTrigger(buttons[buttonToActivate].trigger);
    });
    _.each(button.trigger.deactivateButtons, function(buttonToDeactivate) {
      buttons[buttonToDeactivate].trigger.isActive = !button.trigger.isActive;
      deviceState.setPortsWithTrigger(buttons[buttonToDeactivate].trigger);
    });
    console.log(deviceState.toString());
  };
  buttons = [
    new Button("Head Light Flashers", new Trigger(["2"], [], [], true, false), buttonTriggerChangedCallback),
    new Button("Brake Light Flashers", new Trigger(["3"], [], [], true, false), buttonTriggerChangedCallback),
    new Button("License Plate Amber", new Trigger(["4"], [], [], true, false), buttonTriggerChangedCallback),
    new Button("License Plate Red", new Trigger(["5"], [2], [], true, false), buttonTriggerChangedCallback)
  ];
  deviceState.setPortsWithTriggers(_.map(buttons, function(val) { return val.trigger; }));
  $scope.buttons = buttons;
//  $scope.$watch('buttons', function(newObject, oldObject) {
//    deviceState.setPortsWithTriggers(_.map(newObject, function(val) { return val.trigger; }));
//    console.log(deviceState.toString());
//  }, true);
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
/*    if(typeof $cordovaBluetoothSerial != "undefined") {
      $cordovaBluetoothSerial.list().then(function(result){
        $scope.bluetoothDevices = result;
      },
      function(error) {
        console.log(error);
      });
    }*/
  });
});
