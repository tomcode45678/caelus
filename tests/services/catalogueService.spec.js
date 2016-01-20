var catalogueService = require('../../services/catalogueService');
var productsModel = require('../../models/productsModel');

describe('catalogueService', function() {
  it('should be defined', function () {
    expect(catalogueService).toBeDefined();
  });

  describe('getProducts', function () {
    it('should equal a function', function () {
      expect(catalogueService.getProducts).toEqual(jasmine.any(Function));
    });

    it('should call the products model to get the available products', function () {
      spyOn(productsModel, 'getProducts');

      var mockLocationId = 'GB_MERSY_LIVERPOOL';

      catalogueService.getProducts(mockLocationId);

      expect(productsModel.getProducts).toHaveBeenCalledWith(mockLocationId, jasmine.any(Function));
    });
  });
});
