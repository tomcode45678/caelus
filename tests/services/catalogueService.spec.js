var catalogueService = require('../../services/catalogueService');
var productsModel = require('../../models/productsModel');

describe('catalogueService', function() {
  it('should be defined', function () {
    expect(catalogueService).toBeDefined();
  });

  describe('getProducts', function () {
    var mockLocationId = 'GB_MERSY_LIVERPOOL';

    beforeEach(function () {
      this.mockCallback = function () {};
    });

    it('should equal a function', function () {
      expect(catalogueService.getProducts).toEqual(jasmine.any(Function));
    });

    it('should call the products model to get the available products', function () {
      spyOn(productsModel, 'getProducts');

      catalogueService.getProducts(mockLocationId);

      expect(productsModel.getProducts).toHaveBeenCalledWith(mockLocationId, jasmine.any(Function));
    });

    it('should call the callback with an error if one is passed', function () {
      spyOn(this, 'mockCallback');

      catalogueService.getProducts(mockLocationId, this.mockCallback);

      expect(this.mockCallback).toHaveBeenCalled();
    });
  });
});
