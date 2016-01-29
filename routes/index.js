/* globals require, module, console */
var express = require('express');
var router = express.Router();
var cls = require('../services/customerLocationService');
var catalogueService = require('../services/catalogueService');

/* GET home page. */
router.get('/', function(req, res/*, next*/) {

  cls.getCustomerLocation(req.cookies.customerId)
  .then(function (location) {
    return catalogueService.getLocationBasedProducts(location);
  }, function(error) {
    console.log("Failed!", error);
  })
  .then(function (products) {
    console.log(products);
    res.render('index', { title: 'Build your subscription package' });
  }, function(error) {
    console.log("Failed!", error);
  });
});

module.exports = router;
