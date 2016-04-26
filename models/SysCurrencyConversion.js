module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    currencyId1: {},
    currencyId2: {},
    factor: {},
    type: {},
    value: {}
  },{
    classMethods: {
      associate: function () {
        this.belongsTo( models.SysCurrency, { as: 'currency1', foreignKey: 'correlativo_moneda_1' });
        this.belongsTo( models.SysCurrency, { as: 'currency2', foreignKey: 'correlativo_moneda_2' });
        this.hasMany  ( models.SysCurrencyConversionLog, { as: 'conversionLogs', foreignKey: 'conversion_correlativo'});
      }
    }
  }]
};
