var express = require('express');
var router = express.Router();
var cls = require('../services/customerLocationService');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.cookies.customerId);
  cls.getCustomerLocation(req.cookies.customerId, function (err, location) {
    console.log(location);
    res.render('index', { title: 'Build your subscription package' });
  });
});

module.exports = router;
