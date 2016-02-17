module.exports = function(sequelize, Sequelize) {
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
        this.belongsTo(sequelize.models.SysCurrency, { as: 'currency1', foreignKey: 'correlativo_moneda_1' });
        this.belongsTo(sequelize.models.SysCurrency, { as: 'currency2', foreignKey: 'correlativo_moneda_2' });
        this.hasMany(sequelize.models.SysCurrencyConversionLog, { as: 'conversionLogs', foreignKey: 'conversion_correlativo'});
      }
    }
  }]
};
