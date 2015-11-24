describe('DeviceState', function() {
    beforeEach(module('starter.services'));
    var DeviceState;
    beforeEach(inject(function(_DeviceState_) {
      DeviceState = _DeviceState_
    }));
    describe('create a devicestate', function() {
        it('should call login on dinnerService', function() {
          firstPortNumber = 2;
          numberOfPorts = 8;
          reverseLogic = true;
          var deviceState = new DeviceState(firstPortNumber, numberOfPorts, true);
          expect(deviceState.firstPortPinNumber).toEqual(firstPortNumber);
          expect(deviceState.numberOfPorts).toEqual(numberOfPorts);
          expect(deviceState.reverseLogic).toEqual(reverseLogic);
        });
        it('should create a properly formed json string', function() {
          var deviceState = new DeviceState(2, 8, true);
          expect(deviceState.toString()).toEqual('{"2":1,"3":1,"4":1,"5":1,"6":1,"7":1,"8":1,"9":1}');
        });
        it('should create a properly formed json string', function() {
          var deviceState = new DeviceState(2, 8, false);
          expect(deviceState.toString()).toEqual('{"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0}');
        });
        it('should create a properly formed json string', function() {
          var deviceState = new DeviceState(2, 8, false);
          deviceState.setPort(2, true);
          deviceState.setPort(3, false);
          expect(deviceState.toString()).toEqual('{"2":1,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0}');
        });
        it('should create a properly formed json string', function() {
          trigger = {
            activateOutports: [2,3],
            isActive: true
          };
          var deviceState = new DeviceState(2, 8, false);
//          deviceState.setPortsWithTrigger(trigger);
//          expect(deviceState.toString()).toEqual('{"2":1,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0}');
        });
    });
});
