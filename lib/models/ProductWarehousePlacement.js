module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    productId: {},
    warehousePlacementId: {},
    inStock: {},
    inStock2: {},
    originId: {},
    sessionId: {}
  }, {
    classMethods: {
      associate: function () {
        this.belongsTo(models.WarehousePlacement, { as: 'placement',  foreignKey: 'ubicacion_correlativo'         });
      }
    }
  }];
};