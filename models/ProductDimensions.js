module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    productId: {},
    dimensionUnitId: {},
    height: {},
    width: {},
    length: {},
    weight: {},
    volumeUnitId: {},
    volume: {}
  }, {
    classMethods: {
      associate: function () {
        this.belongsTo(models.Product, { as: 'product',  foreignKey: 'producto_correlativo'    });
      }
    }
  }];
};
