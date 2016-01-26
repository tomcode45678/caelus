/* globals require, module */
var productsModel = require('../models/productsModel');

/**
 * Class which builds a custom catalogue, using products and category data
 */
module.exports = {
  cachedProducts: [],

  getLocationBasedProducts: function(locationId) {
    var filter = {key: 'location', value: locationId};

    return this.filterProducts(filter, function (err, products) {
      if (err) {
        return err;
      }
      return products;
    });
  },

  getAvailableProducts: function () {
    var filter = {key: 'available', value: true};
    return this.filterProducts(filter);
  },

  filterProducts: function (filter) {
    if (!filter || !filter.key || !filter.value) {
      return 'filter: ' + filter;
    }

    if (this.cachedProducts.length) {
      return this.filter(filter);
    } else {
      return this.getProducts(filter);
    }
  },

  getProducts: function (filter) {
    return productsModel.getProducts().then(this.setCachedProducts.bind(null, filter));
  },

  setCachedProducts: function (filter, products) {
    this.cachedProducts = products;
    return this.filter(filter);
  },

  filter: function (filter) {
    for (var i = 0, productsLength = this.cachedProducts.length; i < productsLength; i++) {
      var product = this.cachedProducts[i];
      if (product[filter.key] !== filter.value) {
        this.cachedProducts.splice(i, 1);
      }
    }
    return this.cachedProducts;
  },

  // Format data for view
  buildCatalogue: function () {

  }
};
