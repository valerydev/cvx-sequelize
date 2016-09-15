module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    productWarehouseId: {},
    warehousePlacementId: {},
    inStock: {},
    inStock2: {},
    reserved: {},
    reserved2: {},
    pendingDispatch: {},
    pendingDispatch2: {},
    consigned: {},
    consigned2: {},
    originId: {},
    sessionId: {}
  }, {
    classMethods: {
      transactionLog: true,
      associate: function () {
        this.belongsTo(models.WarehousePlacement, { as: 'placement',  foreignKey: 'ubicacion_correlativo'         });
      }
    }
  }];
};
