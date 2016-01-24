var productsModel = require('../../models/productsModel.js');

describe('productsModel', function () {
  it('should be defined', function () {
    expect(productsModel).toBeDefined();
  });

  describe('read', function () {
    it('should contain a read property', function () {
      expect(productsModel.read).toBeDefined();
    });
  });

  describe('getProducts', function () {
    it('should be equal to a function', function () {
      expect(productsModel.getProducts).toEqual(jasmine.any(Function));
    });

    it('should call a get data function', function () {
      spyOn(productsModel, 'getData');

      productsModel.getProducts();

      expect(productsModel.getData).toHaveBeenCalledWith('products');
    });
  });

  describe('getProductCategories', function () {
    it('should equal a function', function () {
      expect(productsModel.getProductCategories).toEqual(jasmine.any(Function));
    });

    it('should call a get data function', function () {
      spyOn(productsModel, 'getData');

      productsModel.getProductCategories();

      expect(productsModel.getData).toHaveBeenCalledWith('categories');
    });
  });

  describe('getProductsWithCategories', function () {
    it('should equal a function', function () {
      expect(productsModel.getProductsWithCategories).toEqual(jasmine.any(Function));
    });

    it('should call a get data function', function () {
      spyOn(productsModel, 'getData');

      productsModel.getProductsWithCategories();

      expect(productsModel.getData).toHaveBeenCalledWith();
    });
  });

  describe('getData', function () {
    it('should equal a function', function () {
      expect(productsModel.getData).toEqual(jasmine.any(Function));
    });

    it('should bind the data block to the success callback', function () {
      var mockDataBlock = 'some property from the JSON response';

      spyOn(productsModel.getDataSuccessHandler, 'bind');

      productsModel.getData(mockDataBlock);

      expect(productsModel.getDataSuccessHandler.bind).toHaveBeenCalledWith(null, mockDataBlock);
    });

    it('should call a read file API', function () {
      var PRODUCTS_DATA_PATH = 'data/products.json';

      spyOn(productsModel, 'read').andCallThrough();

      productsModel.getData();

      expect(productsModel.read).toHaveBeenCalledWith(PRODUCTS_DATA_PATH, 'utf8');
    });
  });

  describe('getDataSuccessHandler', function () {
    it('should equal a function', function () {
      expect(productsModel.getDataSuccessHandler).toEqual(jasmine.any(Function));
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

      var test = productsModel.getDataSuccessHandler(mockDataBlock, JSON.stringify(mockData));

      expect(test).toEqual(mockData.awesomeData);
    });

    it('should return the dataBlock segment of data if passed', function () {
      var mockData = {
        notSoAwesomeData: []
      };
      var mockDataBlock = 'awesomeData';

      var test = productsModel.getDataSuccessHandler(null, JSON.stringify(mockData));

      expect(test).toEqual(mockData);
    });
  });

  describe('getDataErrorHandler', function () {
    it('should equal a function', function () {
      expect(productsModel.getDataErrorHandler).toEqual(jasmine.any(Function));
    });

    it('should return an error if one is passed', function () {
      var mockError = 'Some error about data being missing';

      expect(productsModel.getDataErrorHandler(mockError)).toEqual(mockError);
    });
  });
});
