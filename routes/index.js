/* globals require, module, console */
var express = require('express');
var router = express.Router();
var Promise = require('promise');
var cls = require('../services/customerLocationService');
var catalogueService = require('../services/catalogueService');

/* GET home page. */
router.get('/', function(req, res/*, next*/) {
  new Promise(function (resolve, reject) {
    cls.getCustomerLocation(req.cookies.customerId, function (err, location) {
      if (location) {
        resolve(location);
      }

      if (err) {
        reject(err);
      }
    });
  })
  .then(function (location) {
    catalogueService.getLocationBasedProducts(location, function (err, products) {
      return products;
    });
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
