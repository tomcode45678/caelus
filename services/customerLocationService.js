var user = require('../models/user');

exports.getCustomerLocation = function (customerId, callback) {
  user.getUser(customerId, function (err, user) {
    if (err) return callback(err);
    callback(null, user.location);
  });
};
