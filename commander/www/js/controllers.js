angular.module('starter.controllers', ['ngCordova', 'ui.router', 'underscore'])

.controller('DashCtrl', function($rootScope, $scope, $ionicPlatform,
  $cordovaPreferences, $cordovaBluetoothSerial, $state, Button, Trigger,
  DeviceState, $cordovaToast, Helper) {
  var deviceState = new DeviceState(2, 8, true);
  $scope.buttonClicked = function(button) {
    button.trigger.isActive = !button.trigger.isActive;
    buttonTriggerChangedCallback(button);
  };
  $rootScope.deviceState = deviceState;
  $rootScope._ = _;
  $ionicPlatform.ready(function() {
    $cordovaPreferences.fetch('deviceState')
      .success(function(value) {
        if (value !== null) {
          $rootScope.deviceState.firstPortPinNumber = value.firstPortPinNumber;
          $rootScope.deviceState.numberOfPorts = value.numberOfPorts;
          $rootScope.deviceState.reverseLogic = value.reverseLogic;
          $rootScope.deviceState.bluetoothDevice = value.bluetoothDevice;
          $rootScope.deviceState.buttons = value.buttons;
        } else {
          $rootScope.deviceState.buttons = [
            new Button('Head Light Flashers', new Trigger(['2'], [], [], true,
              false), buttonTriggerChangedCallback),
            new Button('Brake Light Flashers', new Trigger(['3'], [], [], true,
              false), buttonTriggerChangedCallback),
            new Button('License Plate Amber', new Trigger(['5'], [], [], true,
              false), buttonTriggerChangedCallback),
            new Button('License Plate Red', new Trigger(['6'], [], [], true,
              false), buttonTriggerChangedCallback),
            new Button('Rear Emergency', new Trigger([], [3, 1], [], true,
              false), buttonTriggerChangedCallback),
            new Button('Front Emergency', new Trigger([], [0], [], true,
              false), buttonTriggerChangedCallback),
            new Button('Emergency', new Trigger([], [0, 1, 3, 4, 5], [], true,
              false), buttonTriggerChangedCallback)
          ];
        }
        deviceState.setPortsWithTriggers(_.map(deviceState.buttons,
          function(val) { return val.trigger; }));
        deviceState.buttons = $rootScope.deviceState.buttons;
      })
      .error(function(error) {
        Helper.displayMessage(error);
        console.log(error);
      }
    );
  });
  var buttonTriggerChangedCallback = function(button) {
    console.log('button trigger callback called');
    deviceState.setPortsWithTrigger(button.trigger);
    _.each(button.trigger.activateButtons, function(buttonToActivate) {
      deviceState.buttons[buttonToActivate].trigger.isActive =
        button.trigger.isActive;
      deviceState.setPortsWithTrigger(
        deviceState.buttons[buttonToActivate].trigger
      );
    });
    _.each(button.trigger.deactivateButtons, function(buttonToDeactivate) {
      deviceState.buttons[buttonToDeactivate].trigger.isActive =
        !button.trigger.isActive;
      deviceState.setPortsWithTrigger(buttons[buttonToDeactivate].trigger);
    });
    console.log(deviceState.toString());
    $cordovaBluetoothSerial.isConnected().then(
      function() {
        $cordovaBluetoothSerial.write(deviceState.toString(),
          function() {
          },
          function() { // undo our changes because the write failed
            Helper.displayMessage('Failed to send command to device');
          }
        );
      },
      function() { //Undo our changes because we're not connected to wifi
        Helper.displayMessage('Connect to a device first');
      }
    );
  };
  $scope.listSettings = {
    canSwipe: true,
    showReorder: false,
    showDelete: false
  };
  $scope.connectButton = {
    text: 'Connect',
    isDisabled: false,
    click: function() {
      if ($rootScope.deviceState.bluetoothDevice !== null) {
        $cordovaBluetoothSerial.isConnected().then(
          function() {
            $cordovaBluetoothSerial.disconnect().then(
              function(success) {
                Helper.displayMessage('Disconnected!');
                $scope.connectButton.text = 'Connect';
                $scope.connectButton.isDisabled = false;
              },
              function(error) {
                Helper.displayMessage(error);
                $scope.connectButton.isDisabled = false;
              }
            );
          },
          function() {
            $scope.connectButton.text = 'Connecting...';
            $scope.connectButton.isDisabled = true;
            $cordovaBluetoothSerial
              .connect($rootScope.deviceState.bluetoothDevice).then(
              function(success) {
                Helper.displayMessage('Connected!');
                $scope.connectButton.text = 'Disconnect';
                $scope.connectButton.isDisabled = false;
              },
              function(error) {
                Helper.displayMessage(error);
                $scope.connectButton.text = 'Connect';
                $scope.connectButton.isDisabled = false;
              }
            );
          }
        );
      } else {
        Helper.displayMessage('Please select a bluetooth device first.');
      }
    }
  };
})

.controller('SettingsCtrl', function($rootScope, $scope, $ionicPlatform,
  $cordovaBluetoothSerial, $cordovaPreferences, $cordovaToast) {
  $scope.bluetoothDevices = [''];

  $ionicPlatform.ready(function() {
    if (ionic.Platform.platform() !== 'linux') {
      $cordovaBluetoothSerial.list().then(function(result) {
        $scope.bluetoothDevices = result;
      },
      function(error) {
        Helper.displayMessage(error);
        console.log(error);
      });
    }
  });
  $scope.$on('$ionicView.beforeLeave', function() {
    $cordovaPreferences.store('deviceState', $rootScope.deviceState);
  });
})

.controller('EditButtonCtrl', function($scope, $rootScope, $stateParams,
  $ionicHistory, $cordovaPreferences, Button, Trigger) {
  if ($stateParams.index >= $rootScope.deviceState.buttons.length) { //Its new, so add a new button
    $rootScope.deviceState.buttons.push(new Button('', new Trigger([], [], [],
      true, false)));
  }
  $scope.button = $rootScope.deviceState.buttons[$stateParams.index];
  $scope.$on('$ionicView.beforeLeave', function() {
    console.log('Going back, saving state');
    $cordovaPreferences.store('deviceState', $rootScope.deviceState);
  });
  $scope.deleteButton = function() {
    $rootScope.deviceState.removeButtonAtIndex($stateParams.index);
    $cordovaPreferences.store('deviceState', $rootScope.deviceState);
    $ionicHistory.goBack();
  };
});
