module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    productId: {},
    classifierId1: {},
    classifierId2: {},
    classifierId3: {},
    branchId: {},
    currencyId: {},
    currencyFactor: {},
    specialCurrencyFactor: {},
    grossPrice: {},
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
    bonusUnits: {},
    unitCost: {},
    addedCost1: {},
    addedCost2: {},
    addedCost3: {},
    addedCost4: {},
    addedCostPercentage1: {},
    addedCostPercentage2: {},
    addedCostPercentage3: {},
    addedCostPercentage4: {},
    importCost: {},
    calculedCost: {},
    unitAverageCost: {},
    calculatedAverageCost: {},
    initialCalculatedCost: {},
    initialUnitAverageCost: {},
    initialCalculatedAverageCost: {},
    decimalPrecision: {}
  }, {
    classMethods: {
      associate: function () {
        this.belongsTo(models.Product,  { as: 'product',  foreignKey: 'producto_correlativo' });
        this.belongsTo(models.Currency, { as: 'currency', foreignKey: 'moneda_correlativo'   });
      }
    },
    defaultScope: function() {
      return this.scopes.includeCurrency();
    },
    scopes: {
      includeCurrency: function(){
        return {
          include: [
            { as: 'currency', model: models.Currency.scope('shortInfo', 'includeSysCurrency') }
          ]
        }
      }
    }
  }];
};
