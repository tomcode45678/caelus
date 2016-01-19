var customerSession = require('../../middlewares/customerSession.js');

describe('customerSession', function() {
  // Same as in script
  var userId = 1231;

  // Mock objects
  var req = {
    cookies: {
      customerId: userId
    }
  };

  var res = {
    cookie: function () {},
    redirect: function () {}
  };

  beforeEach(function () {
    this.next = function () {};
  });

  it('should equal a function', function () {
    expect(customerSession).toEqual(jasmine.any(Function));
  });

  it('should set a cookie if the customerId is not set', function () {
    var cookieParams = { maxAge: 900000, httpOnly: true };

    spyOn(res, 'cookie');

    req.cookies.customerId = undefined;
    customerSession(req, res, this.next);

    expect(res.cookie).toHaveBeenCalledWith('customerId', userId, cookieParams);
  });

  it('should redirect if a cookie has been set', function () {
    spyOn(res, 'redirect');

    req.cookies.customerId = undefined;
    customerSession(req, res, this.next);

    expect(res.redirect).toHaveBeenCalledWith('back');
  });

  it('should call the next callback if there is a cookie set', function () {
    spyOn(this, 'next');

    req.cookies.customerId = userId;
    customerSession(req, res, this.next);

    expect(this.next).toHaveBeenCalled();
  });
});
