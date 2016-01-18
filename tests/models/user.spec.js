var userModel = require('../../models/user.js');
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
    it('should equal a function', function () {
      expect(userModel.findUser).toEqual(jasmine.any(Function));
    });

    it('should throw an error if there is no customerId', function () {
      this.mockCallback = function () {};
      var mockCustomerId = undefined;
      var customError = 'customerId: ' + mockCustomerId;

      spyOn(this, 'mockCallback');

      // Cannot use bind so must execute function with call
      userModel.findUser.call(null, mockCustomerId, this.mockCallback);

      expect(this.mockCallback).toHaveBeenCalledWith(customError);
    });
  });
});