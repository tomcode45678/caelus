var customerLocationService = require('../../services/customerLocationService.js');
var userModel = require('../../models/user');

describe('customerLocationService', function() {
  it('should be defined', function () {
    expect(customerLocationService).toBeDefined();
  });

  describe('getCustomerLocation', function () {
    it('should equal a function', function () {
      expect(customerLocationService.getCustomerLocation).toEqual(jasmine.any(Function));
    });

    it('should convert the customerId to a number', function () {
      var mockCustomerId = '1028';

      spyOn(global, 'Number');

      customerLocationService.getCustomerLocation(mockCustomerId);

      expect(global.Number).toHaveBeenCalledWith(mockCustomerId);
    });

    it('should call a getUser api', function () {
      var mockCustomerId = '1028';

      spyOn(userModel, 'getUser');

      customerLocationService.getCustomerLocation(mockCustomerId);

      expect(userModel.getUser).toHaveBeenCalledWith(Number(mockCustomerId), customerLocationService.returnUserLocation);
    });
  });

  describe('returnUserLocation', function () {
    beforeEach(function () {
      this.mockCallback = function () {};
    });

    it('should equal a function', function () {
      expect(customerLocationService.returnUserLocation).toEqual(jasmine.any(Function));
    });

    it('should run the callback with an error if present', function () {
      var mockError = 'Oh no! We couldn\'t get that customer.';

      spyOn(this, 'mockCallback');

      customerLocationService.returnUserLocation(this.mockCallback, mockError, undefined);

      expect(this.mockCallback).toHaveBeenCalledWith(mockError);
    });

    it('should run the callback with the users location if a user is present', function () {
      var mockUser = {
        location: 'boston'
      };
      var mockError = null;

      spyOn(this, 'mockCallback');

      customerLocationService.returnUserLocation(this.mockCallback, mockError, mockUser);

      expect(this.mockCallback).toHaveBeenCalledWith(mockError, mockUser.location);
    });
  });
});
