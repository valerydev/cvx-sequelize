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
    buyTaxId3: {},
    originId: {},
    sessionId: {}
  }, {
    transactionLog: true,
    classMethods: {
      associate: function () {
        this.belongsTo(models.Product, { as: 'product',  foreignKey: 'producto_correlativo'         });
        this.belongsTo(models.Tax,     { as: 'saleTax1', foreignKey: 'impuesto1_venta_correlativo'  });
        this.belongsTo(models.Tax,     { as: 'saleTax2', foreignKey: 'impuesto2_venta_correlativo'  });
        this.belongsTo(models.Tax,     { as: 'saleTax3', foreignKey: 'impuesto3_venta_correlativo'  });
        this.belongsTo(models.Tax,     { as: 'buyTax1',  foreignKey: 'impuesto1_compra_correlativo' });
        this.belongsTo(models.Tax,     { as: 'buyTax2',  foreignKey: 'impuesto2_compra_correlativo' });
        this.belongsTo(models.Tax,     { as: 'buyTax3',  foreignKey: 'impuesto3_compra_correlativo' });
      }
    },
    defaultScope: function(){
      return {
        include: _.concat( this.scopes.includeSaleTaxes().include, this.scopes.includeBuyTaxes().include )
      }
    },
    scopes: {
      includeSaleTaxes: function() {
        return {
          include: [
            { as: 'saleTax1', model: models.Tax, required: false },
            { as: 'saleTax2', model: models.Tax, required: false },
            { as: 'saleTax3', model: models.Tax, required: false }
          ]
        }
      },
      includeBuyTaxes: function() {
        return {
          include: [
            { as: 'buyTax1',  model: models.Tax, required: false },
            { as: 'buyTax2',  model: models.Tax, required: false },
            { as: 'buyTax3',  model: models.Tax, required: false }
          ]
        }
      }
    }
  }];
};
