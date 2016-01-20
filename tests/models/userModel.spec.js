var userModel = require('../../models/userModel.js');
var fs = require('fs');

describe('User model', function() {
  it('should be defined', function () {
    expect(userModel).toBeDefined();
  });

  describe('getUser', function () {
    it('should be equal a function', function () {
      expect(userModel.getUser).toEqual(jasmine.any(Function));
    });

    it('should call getUsers', function () {
      spyOn(userModel, 'getUsers');

      userModel.getUser();

      expect(userModel.getUsers).toHaveBeenCalledWith(jasmine.any(Function));
    });
  });

  describe('getUsers', function () {
    it('should equal a function', function () {
      expect(userModel.getUsers).toEqual(jasmine.any(Function));
    });

    it('should call a read file API', function () {
      spyOn(fs, 'readFile');

      userModel.getUsers();

      expect(fs.readFile).toHaveBeenCalled();
    });
  });

  describe('findUser', function () {
    var mockUsers = [];

    beforeEach(function () {
      this.mockCallback = function () {};

      mockUsers = [
        {
          "id": 1,
          "firstName": "Will",
          "lastname": "Ferrell"
        },
        {
          "id": 2,
          "firstName": "Kevin",
          "lastname": "Spacey"
        }
      ];
    });

    it('should equal a function', function () {
      expect(userModel.findUser).toEqual(jasmine.any(Function));
    });

    it('should throw an error if there is no customerId', function () {
      var mockCustomerId = undefined;
      var customError = 'customerId: ' + mockCustomerId;

      spyOn(this, 'mockCallback');

      // Cannot use bind so must execute function with call
      userModel.findUser.call(null, mockCustomerId, this.mockCallback);

      expect(this.mockCallback).toHaveBeenCalledWith(customError);
    });

    it('should throw an error if there is a error argument', function () {
      var mockCustomerId = undefined;
      var mockError = 'Oh no! We couldn\'t get that customer.';

      spyOn(this, 'mockCallback');

      // Cannot use bind so must execute function with call
      userModel.findUser.call(null, mockCustomerId, this.mockCallback, mockError);

      expect(this.mockCallback).toHaveBeenCalledWith(mockError);
    });

    it('should run the callback with a user if available', function () {
      var mockCustomerId = 2;
      var mockError = null;

      spyOn(this, 'mockCallback');

      // Cannot use bind so must execute function with call
      userModel.findUser.call(null, mockCustomerId, this.mockCallback, mockError, mockUsers);

      expect(this.mockCallback).toHaveBeenCalledWith(mockError, mockUsers[1]);
    });

    it('should run the callback with a error if no user is found', function () {
      // Modify mockCustomerId so it is never evaluated as true to a user id
      var mockCustomerId = 'No user';
      var mockError = null;

      spyOn(this, 'mockCallback');

      // Cannot use bind so must execute function with call
      userModel.findUser.call(null, mockCustomerId, this.mockCallback, mockError, mockUsers);

      expect(this.mockCallback).toHaveBeenCalledWith(true);
    });
  });
});
