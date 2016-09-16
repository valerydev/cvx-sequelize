module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    productId: {},
    warehouseId: {},
    min: {},
    max: {},
    reorder: {},
    current: {},
    current2: {},
    reserved: {},
    reserved2: {},
    pendingDispatch: {},
    pendingDispatch2: {},
    requested: {},
    requested2: {},
    ordered: {},
    ordered2: {},
    consigned: {},
    consigned2: {},
    originId: {},
    sessionId: {}
  }, {
    transactionLog: true,
    classMethods: {
      associate: function () {
        this.belongsTo(models.Warehouse,{as: 'warehouse', foreignKey: 'almacen_correlativo'});
        this.belongsToMany(models.WarehousePlacement, {
          as: 'placements',
          through: models.ProductWarehousePlacement,
          foreignKey: {
            name: 'productWarehouseId',
            field: 'producto_almacen_correlativo'
          },
          otherKey: {
            name: 'warehousePlacementId',
            field: 'ubicacion_correlativo'
          }
        });
      }
    }
  }];
};
