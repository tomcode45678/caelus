var catalogueService = require('../../services/catalogueService');
var productsModel = require('../../models/productsModel');

describe('catalogueService', function() {

  it('should be defined', function () {
    expect(catalogueService).toBeDefined();
  });

  describe('getLocationBasedProducts', function () {
    it('should equal a function', function () {
      expect(catalogueService.getLocationBasedProducts).toEqual(jasmine.any(Function));
    });

    it('should call a filter products function', function () {
      var mockLocationId = 'GB_MERSY_LIVERPOOL';
      var filter = {key: 'location', value: mockLocationId};

      spyOn(catalogueService, 'filterProducts');

      catalogueService.getLocationBasedProducts(mockLocationId);

      expect(catalogueService.filterProducts).toHaveBeenCalledWith(filter, jasmine.any(Function));
    });
  });

  describe('getAvailableProducts', function () {
    it('should equal a function', function () {
      expect(catalogueService.getAvailableProducts).toEqual(jasmine.any(Function));
    });

    it('should call a filter function', function () {
      var expectedFilter = {key: 'available', value: true};

      spyOn(catalogueService, 'filterProducts');

      catalogueService.getAvailableProducts();

      expect(catalogueService.filterProducts).toHaveBeenCalledWith(expectedFilter);
    });
  });

  describe('filterProducts', function () {
    beforeEach(function () {
      this.mockCallback = function () {};
    });

    it('should equal a function', function () {
      expect(catalogueService.filterProducts).toEqual(jasmine.any(Function));
    });

    it('should pass an error message into the callback a incorrect filter is not provided', function () {
      var filter;
      var expectedErrorMessage = 'filter: ' + filter;

      spyOn(this, 'mockCallback');

      catalogueService.filterProducts(filter, this.mockCallback);

      expect(this.mockCallback).toHaveBeenCalledWith(expectedErrorMessage);
    });

    it('should call a filter method if there are products available', function () {
      var filter = {key: 'compare', value: 'mustBeThisValue'};
      var mockProduct = {title: "something"};
      catalogueService.cachedProducts = [mockProduct, mockProduct];

      spyOn(catalogueService, 'filter');

      catalogueService.filterProducts(filter, this.mockCallback);

      expect(catalogueService.filter).toHaveBeenCalledWith(filter, this.mockCallback);
    });

    it('should call the populate the cached products if there are none', function () {
      var expectedFilter = {key: 'compare', value: 'mustBeThisValue'};
      catalogueService.cachedProducts = [];

      spyOn(productsModel, 'getProducts');

      catalogueService.filterProducts(expectedFilter, this.mockCallback);

      expect(productsModel.getProducts).toHaveBeenCalledWith(jasmine.any(Function));
    });
  });

  describe('filter', function () {
    beforeEach(function () {
      this.mockCallback = function () {};
    });

    it('should equal a function', function () {
      expect(catalogueService.filter).toEqual(jasmine.any(Function));
    });

    it('should pass the filtered products into the callback', function () {
      var productToReturn = {
        "id": 1,
        "category": 1,
        "name": "Arsenal TV",
        "available": 1,
        "locationId": "GB_EN_LONDON"
      };

      var mockProducts = [productToReturn, {
        "id": 2,
        "category": 1,
        "name": "Liverpool TV",
        "available": 1,
        "locationId": "GB_EN_LIVERPOOL"
      }];

      var filter = {key: 'locationId', value: 'GB_EN_LONDON'};
      catalogueService.cachedProducts = mockProducts;

      spyOn(this, 'mockCallback');

      catalogueService.filter(filter, this.mockCallback);

      expect(this.mockCallback).toHaveBeenCalledWith(null, [productToReturn]);
    });
  });

  describe('buildCatalogue', function () {
    it('should equal a function', function () {
      expect(catalogueService.buildCatalogue).toEqual(jasmine.any(Function));
    });
  });
});
