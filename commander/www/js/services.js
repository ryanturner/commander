angular.module('starter.services', [])

.factory('DeviceState', function() {
  var ports;
  function DeviceState(firstPortPinNumber, numberOfPorts, reverseLogic) {
    this.firstPortPinNumber = firstPortPinNumber;
    this.numberOfPorts = numberOfPorts;
    this.reverseLogic = reverseLogic;
    this.ports = {};
    for(i = firstPortPinNumber; i - firstPortPinNumber < numberOfPorts; i++) {
      this.setPort(i, false);
    }
  }
  DeviceState.prototype.setPort = function(port, state) {
    portValue = (state && !this.reverseLogic) || (!state && this.reverseLogic);
    this.ports[port] = portValue ? 1 : 0;
  };
  DeviceState.prototype.setPortsWithTrigger = function(trigger) {
    _.each(trigger.activateOutports, function(activateOutport) {
      this.setPort(activateOutport, trigger.isActive);
    }, this);
  };
  DeviceState.prototype.setPortsWithTriggers = function(triggers) {
    _.each(triggers, function(trigger) {
      this.setPortsWithTrigger(trigger);
    }, this);
  };
  DeviceState.prototype.toString = function() {
    return JSON.stringify(this.ports);
  };
  DeviceState.prototype.removeButtonAtIndex = function(index) {
    _.each(this.buttons, function(button, i) {
      _.each(button.trigger.activateButtons, function(activateButton, j) {
        if(activateButton > index) {
          this.buttons[i].trigger.activateButtons[j]--;
        } else if(activateButton == index) {
          this.buttons[i].trigger.activateButtons.splice(j, 1);
        }
      }, this);
      _.each(button.trigger.deactivateButtons, function(deactivateButton, j) {
        if(deactivateButton > index) {
          this.buttons[i].trigger.deactivateButtons[j]--;
        } else if(deactivateButton == index) {
          this.buttons[i].trigger.deactivateButtons.splice(j, 1);
        }
      }, this);
    }, this);
    this.buttons.splice(index, 1);
  };
  return DeviceState;
});
