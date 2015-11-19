angular.module('commander.models', [])

.factory('Trigger', function() {
  function Trigger(activateOutports, activateButtons, deactivateButtons, activeState) {
    this.activateOutports = activateOutports;
    this.activateButtons = activateButtons;
    this.deactivateButtons = deactivateButtons;
    this.activeState= activeState; //valid options are either true or false (meaning when the trigger is active, either turn stuff on or off), 0 for momentary on, or a number > 0 for a timed length on
  }
  return Trigger;
})

.factory('Button', function(Trigger) {
  function Button(name, trigger) {
    this.name = name;
    this.trigger = trigger;
  }
  return Button;
})

.factory('Input', function(Trigger) {
  function Input(inPort, trigger) {
    this.inPort = inPort;
    this.trigger = trigger;
  }
  return Input;
})

.factory('Port', function() {
  function Port(pin, name) {
    this.pin = pin;
    this.name = name;
  }
  return Port;
})

.factory('OutPort', function(Port) {
  function OutPort(type, port) {
    this.type = type;
    this.port = port;
  }
  return OutPort;
})

.factory('InPort', function(Port) {
  function InPort(triggeredState, port) {
    this.triggeredState = triggeredState;
    this.port = port;
  }
  return InPort;
});
