module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    productId: {},
    saleTaxId1: {},
    saleTaxId2: {},
    saleTaxId3: {},
    buyTaxId1: {},
    buyTaxId2: {},
    buyTaxId3: {}
  }, {
    classMethods: {
      associate: function () {
        this.belongsTo(models.Product, { as: 'product',  foreignKey: 'producto_correlativo'    });
      }
    }
  }];
};
