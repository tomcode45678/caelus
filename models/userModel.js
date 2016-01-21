var fs = require('fs');
var USERS_DATA_PATH = 'data/users.json';

exports.getUser = function (customerId, callback) {
  this.getUsers(this.findUser.bind(null, customerId, callback));
}

exports.getUsers = function (callback) {
  fs.readFile(USERS_DATA_PATH, 'utf8', function (err, data) {
    if (err) return callback(err);
    callback(null, JSON.parse(data).users);
  });
}

// Internal function, only exposed for unit testing
exports.findUser = function (customerId, callback, err, users) {
  if (err) return callback(err);
  if (!customerId) return callback('customerId: ' + customerId);

  for (var i = 0, usersLength = users.length; i < usersLength; i++) {
    var user = users[i];
    if (user.id === customerId) {
      return callback(null, user);
    }
  }
  return callback(true);
}
