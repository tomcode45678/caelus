/* globals module */
// Check for user session
module.exports = function (req, res, next) {
  if (!req.cookies.customerId) {
    res.cookie('customerId', 1231, { maxAge: 900000, httpOnly: true });
    res.redirect('back');
  } else {
    next();
  }
};
