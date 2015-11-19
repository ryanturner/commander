.factory('Trigger', function() {
  function Trigger(activateOutports, activateButtons, deactivateButtons, duration) {
    this.activateOutports = activateOutports;
    this.activateButtons = activateButtons;
    this.deactivateButtons = deactivateButtons;
    this.duration = duration;
  }
  return Trigger;
});

.factory('Button', function(Trigger) {
  function Button(name, trigger) {
    this.name = name;
    this.trigger = trigger;
  }
  var buttons = [
    
  ];
  return Button;
});

.factory('Input', function(Trigger) {
  function Input(inPort, trigger) {
    this.inPort = inPort;
    this.trigger = trigger;
  }
  return Input;
});

.factory('Port', function() {
  function Port(pin, name) {
    this.pin = pin;
    this.name = name;
  }
  return Port;
});

.factory('OutPort', function(Port) {
  function OutPort(type, port) {
    this.type = type;
    this.port = port;
  }
  return OutPort;
});

.factory('InPort', function(Port) {
  function InPort(triggeredState, port) {
    this.triggeredState = triggeredState;
    this.port = port;
  }
  return InPort;
});
