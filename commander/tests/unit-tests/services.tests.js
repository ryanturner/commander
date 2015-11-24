describe('DeviceState', function() {
    beforeEach(module('starter.services'));
    beforeEach(module('ngCordovaMocks'));
    var DeviceState;
    var Helper;
    beforeEach(inject(function(_DeviceState_, _Helper_) {
      DeviceState = _DeviceState_
      Helper = _Helper_
    }));
    describe('test helper', function() {
      it('should show an alert when on linux', function() {
        
      });
    });
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
    });
});
