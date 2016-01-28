var customerLocationService = require('../../services/customerLocationService.js');
var usersModel = require('../../models/usersModel');

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

      spyOn(usersModel, 'getUser').andCallThrough();

      customerLocationService.getCustomerLocation(mockCustomerId);

      expect(usersModel.getUser).toHaveBeenCalledWith(Number(mockCustomerId));
    });
  });

  describe('returnUserLocation', function () {
    it('should equal a function', function () {
      expect(customerLocationService.returnUserLocation).toEqual(jasmine.any(Function));
    });

    it('should run the callback with an error if present', function () {
      var mockUser = undefined;
      var errorMessage = 'user: ' + mockUser;
      var compare = customerLocationService.returnUserLocation;

      // Using bind rather than wrapping in anonymous function
      expect(compare.bind(null, mockUser)).toThrow(new Error(errorMessage));
    });

    it('should run the callback with the users location if a user is present', function () {
      var mockUser = {
        location: 'boston'
      };
      var mockError = null;

      var compare = customerLocationService.returnUserLocation(mockUser);

      expect(compare).toEqual(mockUser.location);
    });
  });
});
