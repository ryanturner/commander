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
    })
});
