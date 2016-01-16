var express = require('express');
var router = express.Router();

// Check for user session
router.use(function (req, res, next) {
  if (req.cookies.customerId) {
    req.customerId = req.cookies.customerId;
  } else {
    res.cookie('customerId', 1231, { maxAge: 900000, httpOnly: true });
    req.customerId = req.cookies.customerId;
  }
  next();
});

module.exports = router;
