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
    value: {},
    originId: {},
    sessionId: {}

  }, {
	 transactionLog:true,
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
              model: models.Currency.scope('shortInfo'),
              required: false,
              include: [
                { as: 'sysCurrency', model: models.SysCurrency, required: false }
              ]
            },
            {
              as: 'currency2',
              model: models.Currency.scope('shortInfo'),
              required: false,
              include: [
                { as: 'sysCurrency', model: models.SysCurrency, required: false }
              ]
            }
          ]
        }
      }
    }
  }];
};

