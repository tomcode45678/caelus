var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var customerId = req.customerId;
  res.render('index', { title: 'Build your subscription package' });
});

module.exports = router;
