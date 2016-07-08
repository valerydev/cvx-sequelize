module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    productId: {},
    unitId: {},
    height: {},
    width: {},
    length: {},
    weight: {},
    metricUnitId: {},
    volume: {}
  }, {
    classMethods: {
      associate: function () {
        this.belongsTo(models.Product, { as: 'product',  foreignKey: 'producto_correlativo'    });
      }
    }
  }];
};
