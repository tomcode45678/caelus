var fs = require('fs');
var USERS_PATH = 'data/users.json';

exports.getUser = function (customerId, callback) {
  getUsers(function (err, users) {
    if (err) throw callback(err);

    for (var i = 0, usersLength = users.length; i < usersLength; i++) {
      var user = users[i];
      if (user.id === customerId) {
        return callback(null, user);
      }
    }
    return callback(true);
  });
}

function getUsers (callback) {
  fs.readFile(USERS_PATH, 'utf8', function (err, data) {
    if (err) return callback(err);
    callback(null, JSON.parse(data).users);
  });
}
