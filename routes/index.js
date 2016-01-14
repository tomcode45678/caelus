var express = require('express');
var router = express.Router();

router.use('/', function setCustomerId(req, res, next) {
  if (req.cookies.customerId) {
    req.customerId = req.cookies.customerId;
  }
  res.cookie('customerId', 1231, { maxAge: 900000, httpOnly: true });
  req.customerId = req.cookies.customerId;
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var customerId = req.customerId;
  console.log(customerId);
  res.render('index', { title: 'Build your subscription package' });
});

module.exports = router;
