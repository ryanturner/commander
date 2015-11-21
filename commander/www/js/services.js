angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

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
  };
  DeviceState.prototype.setPort = function(port, state) {
    portValue = ( state && !this.reverseLogic ) || ( !state && this.reverseLogic )
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
  return DeviceState;
});
