var productsModel = require('../models/productsModel');

exports.getProducts = function(locationId, callback) {
  productsModel.getProducts(locationId, function (err, products) {
    if (err) return callback(err);
    callback(products);
  });
};
