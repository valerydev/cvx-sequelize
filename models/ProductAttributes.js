module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    productId: {},
    editableDescription: {},
    forSale: {},
    buyable: {},
    composite: {},
    consignment: {},
    internal: {},
    fractioned: {},
    hasSerial: {},
    size: {},
    color: {},
    composedCodingMethod: {},
    franchiseProfitPercentage: {},
    imported: {},
    warrantyDays: {},
    passwordProtectedSale: {}
  }, {
    classMethods: {
      associate: function () {
        this.belongsTo(models.Product, { as: 'product',  foreignKey: 'producto_correlativo'    });
      }
    }
  }];
};
