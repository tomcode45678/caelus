var express = require('express');
var fs = require('fs');
var router = express.Router();

var USERS_PATH = 'data/users.json';

router.use('/', function setCustomerId(req, res, next) {
  if (req.cookies.customerId) {
    req.customerId = req.cookies.customerId;
  }
  res.cookie('customerId', 1231, { maxAge: 900000, httpOnly: true });
  req.customerId = req.cookies.customerId;
  next();
});

router.use('/', function(req, res, next) {
  fs.readFile(USERS_PATH, 'utf8', function (err, data) {
    if (err) throw err;
    req.users = JSON.parse(data);
    console.log(req.customerId, req.users);
    next();
  });
});

module.exports = router;
