var productsModel = require('../models/productsModel');

/**
 * Class which builds a custom catalogue, using products and category data
 */
exports.cachedProducts = [];

exports.getLocationBasedProducts = function(locationId, callback) {
  this.filterProducts(locationId, function (err, products) {
    if (err) return callback(err);
    callback(null, products);
  });
};

exports.getAvailableProducts = function (callback) {
  var filter = {key: 'available', value: true};
  this.filterProducts(filter, callback);
}

exports.filterProducts = function (filter, callback) {
  if (!filter || !filter.key || !filter.value) return callback('filter: ' + filter);

  if (this.cachedProducts.length) {
    this.filter(filter, callback);
  } else {
    productsModel.getProducts(function (products) {
      this.cachedProducts = products;
      this.filter(filter, callback);
    });
  }
}

exports.filter = function (filter, callback) {
  for (var i = 0, productsLength = this.cachedProducts.length; i < productsLength; i++) {
    var product = this.cachedProducts[i];
    if (product[filter.key] !== filter.value) {
      this.cachedProducts.splice(i, 1);
    }
  }
  return callback(null, this.cachedProducts);
}

// Format data for view
exports.buildCatalogue = function () {

};
