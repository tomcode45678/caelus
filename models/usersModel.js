/* globals require, module */
var fs = require('fs');
var Promise = require('promise');
var USERS_DATA_PATH = 'data/users.json';

var UsersModel = {
  read: Promise.denodeify(fs.readFile),

  getUser: function (customerId) {
    return new Promise(function (resolve) {
      var findUser = UsersModel.findUser.bind(null, customerId);
      resolve(UsersModel.getUsers().then(findUser));
    });
  },

  getUsers: function () {
    return this.read(USERS_DATA_PATH, 'utf8').then(this.getDataSuccessHandler, this.errorHandler);
  },

  getDataSuccessHandler: function (data) {
    return JSON.parse(data).users;
  },

  errorHandler: function (err) {
    throw new Error(err);
  },

  findUser: function (customerId, users) {
    if (!customerId) {
      return this.errorHandler('customerId: ' + customerId);
    }

    for (var i = 0, usersLength = users.length; i < usersLength; i++) {
      var user = users[i];
      if (user.id === customerId) {
        return user;
      }
    }
    return null;
  }
};

module.exports = UsersModel;
