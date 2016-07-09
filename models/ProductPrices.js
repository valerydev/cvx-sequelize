module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    productId: {},
    currencyId: {},
    currencyFactor:{},
    specialCurrencyFactor: {},
    maxPrice: {},
    offerPrice: {},
    higherPrice: {},
    lowerPrice: {},
    extraPrice1: {},
    extraPrice2: {},
    maxPricePercentage: {},
    offerPricePercentage: {},
    higherPricePercentage: {},
    lowerPricePercentage: {},
    extraPricePercentage1: {},
    extraPricePercentage2: {},
    roundMethod: {},
    roundWithTaxIncluded: {},
    defaultPriceType: {},
    decimalPrecision: {},
    altMaxPrice: {},
    altOfferPrice: {},
    altHigherPrice: {},
    altLowerPrice: {},
    altExtraPrice1: {},
    altExtraPrice2: {},
    altMaxPricePercentage: {},
    altOfferPricePercentege: {},
    altHigherPricePercentage: {},
    altLowerPricePercentage: {},
    altExtraPricePercentage1: {},
    altExtraPricePercentage2: {},
    altRoundMethod: {},
    altRoundWithTaxesIncluded: {},
    altDefaultPriceType: {},
    altDecimalPrecision: {}

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
