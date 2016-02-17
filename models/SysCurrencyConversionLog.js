module.exports = function(sequelize, Sequelize) {
  return [{
    id: {},
    conversionId: {},
    createdAt: {},
    factor: {},
    value: {}
  },{
    classMethods: {
      associate: function () {
        this.belongsTo(sequelize.models.SysCurrencyConversion, { as: 'conversion', foreignKey: 'conversion_correlativo' });
      }
    }
  }]
};
