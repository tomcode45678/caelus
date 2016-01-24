var usersModel = require('../models/usersModel');

exports.getCustomerLocation = function (customerId, callback) {
  customerId = Number(customerId);
  usersModel.getUser(customerId, this.returnUserLocation.bind(null, callback));
};

// Only for unit testing
exports.returnUserLocation = function (callback, err, user) {
  if (err) return callback(err);
  callback(null, user.location);
}
