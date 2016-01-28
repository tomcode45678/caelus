var usersModel = require('../../models/usersModel.js');
var fs = require('fs');

describe('Users model', function() {
  it('should be defined', function () {
    expect(usersModel).toBeDefined();
  });

  describe('read', function () {
    it('should contain a read property', function () {
      expect(usersModel.read).toBeDefined();
    });
  });

  describe('getUser', function () {
    it('should be equal a function', function () {
      expect(usersModel.getUser).toEqual(jasmine.any(Function));
    });

    it('should bind the customerId to the find user method', function () {
      var customerId = 1023;

      spyOn(usersModel.findUser, 'bind');

      usersModel.getUser(customerId);

      expect(usersModel.findUser.bind).toHaveBeenCalledWith(null, customerId);
    });

    it('should return a promise', function () {
      var testMethod = usersModel.getUser();

      var test = (testMethod.then instanceof Function
        && testMethod["catch"] instanceof Function
        && testMethod["finally"] instanceof Function);

      expect(test).toBe(true);
    });
  });

  describe('getUsers', function () {
    it('should equal a function', function () {
      expect(usersModel.getUsers).toEqual(jasmine.any(Function));
    });

    it('should call a read file API', function () {
      var USERS_DATA_PATH = 'data/users.json';

      spyOn(usersModel, 'read').andCallThrough();

      usersModel.getUsers();

      expect(usersModel.read).toHaveBeenCalledWith(USERS_DATA_PATH, 'utf8');
    });
  });

  describe('errorHandler', function () {
    it('should equal a function', function () {
      expect(usersModel.errorHandler).toEqual(jasmine.any(Function));
    });

    it('should throw an error', function () {
      var errorMessage = 'test';

      // Using bind rather than wrapping in anonymous function
      expect(usersModel.errorHandler.bind(null, errorMessage)).toThrow(new Error(errorMessage));
    });
  });

  describe('findUser', function () {
    beforeEach(function () {
      this.mockUsers = [
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
      expect(usersModel.findUser).toEqual(jasmine.any(Function));
    });

    it('should throw an error if there is no customerId', function () {
      var mockCustomerId = undefined;
      var customError = 'customerId: ' + mockCustomerId;

      spyOn(usersModel, 'errorHandler');

      usersModel.findUser(mockCustomerId, this.mockUsers);

      expect(usersModel.errorHandler).toHaveBeenCalledWith(customError);
    });

    it('should return the found user', function () {
      var mockCustomerId = 2;

      var user = usersModel.findUser(mockCustomerId, this.mockUsers);

      expect(user).toEqual(this.mockUsers[1]);
    });

    it('should run null if there is no user found', function () {
      // Modify mockCustomerId so it is never evaluated as true to a user id
      var mockCustomerId = 'No user';

      var user = usersModel.findUser(mockCustomerId, this.mockUsers);

      expect(user).toEqual(null);
    });
  });
});
