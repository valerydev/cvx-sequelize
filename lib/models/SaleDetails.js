/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    saleId: {},
    serviceProviderId: {},
    productId: {},
    productName: {},
    currencyId: {},
    currencyExchangeFactor: {},
    unitId: {},
    primaryUnitId: {},
    secondaryUnitId: {},
    unitConversionFactor: {},
    quantity1: {},
    quantity2: {},
    bonusItems: {},
    unitPrice: {},
    priceType: {},
    totalQuantity: {},
    totalGrossValue: {},
    discount1: {},
    discount2: {},
    discount3: {},
    discount4: {},
    discount5: {},
    discount6: {},
    discountPercentage1: {},
    discountPercentage2: {},
    discountPercentage3: {},
    discountPercentage4: {},
    discountPercentage5: {},
    discountPercentage6: {},
    totalNetValue: {},
    cost: {},
    profit: {},
    exempt: {},
    taxBase1: {},
    taxBase2: {},
    tax1: {},
    tax2: {},
    taxPercentage1: {},
    taxPercentage2: {},
    taxId1: {},
    taxId2: {},
    productHasSize: {},
    productHasColor: {},
    productHasSerial: {},
    productHasLot: {},
    originId: {},
    sessionId: {}
  }, {
    transactionLog: true,
    classMethods: {
      associate: function () {
        this.belongsTo(models.ServiceProvider,  { as: 'serviceProvider', foreignKey: 'servidor_correlativo' });
      }
    },
    defaultScope: function(){
      return this.scopes.includeServiceProvider();
    },
    scopes: {
      includeServiceProvider: function(){
        return {
          include: [{ as: 'serviceProvider', model: models.ServiceProvider }]
        }
      }
    }
  }];
};
