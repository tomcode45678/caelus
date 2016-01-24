var fs = require('fs');
var Promise = require('promise');
var PRODUCTS_DATA_PATH = 'data/products.json';

module.exports = {
  read: Promise.denodeify(fs.readFile),

  getProducts: function () {
    return this.getData('products');
  },

  getProductCategories: function () {
    return this.getData('categories');
  },

  getProductsWithCategories: function () {
    return this.getData();
  },

  getData: function (dataBlock) {
    this.getDataSuccessHandler.bind(null, dataBlock);

    return this.read(PRODUCTS_DATA_PATH, 'utf8').then(this.getDataSuccessHandler, this.getDataErrorHandler);
  },

  getDataSuccessHandler: function (dataBlock, data) {
    if (dataBlock) {
      return JSON.parse(data)[dataBlock];
    }
    else {
      return JSON.parse(data);
    }
  },

  getDataErrorHandler: function (error) {
    return error;
  }
};
