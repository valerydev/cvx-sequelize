module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    warehouseId: {},
    placement: {}
  }, {
    classMethods: {
      associate: function () {
        this.belongsToMany(models.Product, {
          as: 'products',
          through: models.ProductWarehousePlacement,
          foreignKey: {
            name: 'warehousePlacementId',
            field: 'ubicacion_correlativo'
          },
          otherKey: {
            name: 'productWarehouseId',
            field: 'producto_almacen_correlativo'
          }
        });
      }
    }
  }];
};
