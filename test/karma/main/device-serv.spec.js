'use strict';

describe('module: main, service: Device', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Device;
  beforeEach(inject(function (_Device_) {
    Device = _Device_;
  }));

  it('should do something', function () {
    expect(!!Device).toBe(true);
  });

});
