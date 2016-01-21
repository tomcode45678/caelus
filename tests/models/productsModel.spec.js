var productsModel = require('../../models/productsModel.js');
var fs = require('fs');

describe('productsModel', function () {
  beforeEach(function () {
    this.mockCallback = function () {};
  });

  it('should be defined', function () {
    expect(productsModel).toBeDefined();
  });

  describe('getProducts', function () {
    it('should be equal to a function', function () {
      expect(productsModel.getProducts).toEqual(jasmine.any(Function));
    });

    it('should call a get data function', function () {
      spyOn(productsModel, 'getData');

      productsModel.getProducts(this.mockCallback);

      expect(productsModel.getData).toHaveBeenCalledWith('products', this.mockCallback);
    });
  });

  describe('getProductCategories', function () {
    it('should equal a function', function () {
      expect(productsModel.getProductCategories).toEqual(jasmine.any(Function));
    });

    it('should call a get data function', function () {
      spyOn(productsModel, 'getData');

      productsModel.getProductCategories(this.mockCallback);

      expect(productsModel.getData).toHaveBeenCalledWith('categories', this.mockCallback);
    });
  });

  describe('getProductsWithCategories', function () {
    it('should equal a function', function () {
      expect(productsModel.getProductsWithCategories).toEqual(jasmine.any(Function));
    });

    it('should call a get data function', function () {
      spyOn(productsModel, 'getData');

      productsModel.getProductsWithCategories(this.mockCallback);

      expect(productsModel.getData).toHaveBeenCalledWith(null, this.mockCallback);
    });
  });

  describe('getData', function () {
    it('should equal a function', function () {
      expect(productsModel.getData).toEqual(jasmine.any(Function));
    });

    it('should call a read file API', function () {
      var PRODUCTS_DATA_PATH = 'data/products.json';

      spyOn(fs, 'readFile');

      productsModel.getData(null, this.mockCallback);

      expect(fs.readFile).toHaveBeenCalledWith(PRODUCTS_DATA_PATH, 'utf8', jasmine.any(Function));
    });
  });

  describe('dataHandler', function () {
    it('should equal a function', function () {
      expect(productsModel.dataHandler).toEqual(jasmine.any(Function));
    });

    it('should return the callback with an error if one is passed', function () {
      var mockError = 'Some error about data being missing';

      spyOn(this, 'mockCallback');

      productsModel.dataHandler(this.mockCallback, null, mockError);

      expect(this.mockCallback).toHaveBeenCalledWith(mockError);
    });

    it('should return the dataBlock segment of data if passed', function () {
      var mockData = {
        awesomeData: {
          moreAwesomeData: [
            'stuff',
            'moreStuff'
          ]
        }
      };
      var mockDataBlock = 'awesomeData';

      spyOn(this, 'mockCallback');

      productsModel.dataHandler(this.mockCallback, mockDataBlock, null, JSON.stringify(mockData));

      expect(this.mockCallback).toHaveBeenCalledWith(mockData.awesomeData);
    });

    it('should return the dataBlock segment of data if passed', function () {
      var mockData = {
        notSoAwesomeData: []
      };
      var mockDataBlock = 'awesomeData';

      spyOn(this, 'mockCallback');

      productsModel.dataHandler(this.mockCallback, null, null, JSON.stringify(mockData));

      expect(this.mockCallback).toHaveBeenCalledWith(mockData);
    });
  });
});
