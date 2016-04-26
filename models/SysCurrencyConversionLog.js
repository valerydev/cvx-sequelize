module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

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
