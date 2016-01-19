var userModel = require('../models/user');

exports.getCustomerLocation = function (customerId, callback) {
  customerId = Number(customerId);
  this.returnUserLocation.bind(null, callback);
  userModel.getUser(customerId, this.returnUserLocation);
};

// Only for unit testing
exports.returnUserLocation = function (callback, err, user) {
  if (err) return callback(err);
  callback(null, user.location);
}
