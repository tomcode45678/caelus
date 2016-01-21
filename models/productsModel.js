var fs = require('fs');
var PRODUCTS_DATA_PATH = 'data/products.json';

exports.getProducts = function (callback) {
  this.getData('products', callback);
}

exports.getProductCategories = function (callback) {
  this.getData('categories', callback);
}

exports.getProductsWithCategories = function (callback) {
  this.getData(null, callback);
}

exports.getData = function (dataBlock, callback) {
  fs.readFile(PRODUCTS_DATA_PATH, 'utf8', this.dataHandler.bind(null, callback, dataBlock));
}

exports.dataHandler = function (callback, dataBlock, err, data) {
  if (err) return callback(err);

  if (dataBlock) {
    callback(JSON.parse(data)[dataBlock]);
  }
  else {
    callback(JSON.parse(data));
  }
}
