/* globals require, module */
var usersModel = require('../models/usersModel');

module.exports = {
  getCustomerLocation: function (customerId) {
    customerId = Number(customerId);
    return usersModel.getUser(customerId).then(this.returnUserLocation);
  },

  returnUserLocation: function (user) {
    if (!user) {
      throw new Error('user: ' + user);
    }
    return user.location;
  }
};
