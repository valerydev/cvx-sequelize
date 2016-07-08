module.exports = function(sequelize, Sequelize) {

  var fn = Sequelize.fn;
  var col = Sequelize.col;
  var literal = Sequelize.literal;
  var models = sequelize.models;
  var _ = Sequelize.Utils._;

  return [{
    id: {},
    currencyId1: {},
    currencyId2: {},
    factor: {},
    type: {},
    value: {}

  }, {

    classMethods: {
      associate: function () {
        this.belongsTo(models.Currency, {as: 'currency1', foreignKey: 'correlativo_moneda_1'});
        this.belongsTo(models.Currency, {as: 'currency2', foreignKey: 'correlativo_moneda_2'});
        this.hasMany(models.CurrencyExchangeLog, {as: 'logs', foreignKey: 'conversion_correlativo'});
      }
    },
    defaultScope: function(){
      return this.scopes.includeCurrencies();
    },
    scopes: {
      includeCurrencies: function () {
        return {
          include: [
            {
              as: 'currency1',
              model: models.Currency.scope(null),
              attributes: ['customExchange', 'primary', 'active']
            },
            {
              as: 'currency2',
              model: models.Currency.scope(null),
              attributes: ['customExchange', 'primary', 'active']
            }
          ]
        }
      }
    }
  }];
};

