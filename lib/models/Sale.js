/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    branchId: {},
    stationId: {},
    userId: {},
    sellerId: {},
    currencyId: {},
    currencyExchangeFactor: {},
    customerId: {},
    kind: {},
    customerFullName: {},
    customerName: {},
    customerMiddleName: {},
    customerSurname: {},
    customerSecondSurname: {},
    customerFiscalId1: {},
    customerFiscalId2: {},
    timezone: {},
    timezoneId: {},
    document: {},
    documentType: {},
    issuedAt: {},
    issuedTime: {},
    validDays: {},
    expiresAt: {},
    itemsTotalGrossValue: {},
    itemsDiscount: {},
    itemsCharges: {},
    totalGrossValue: {},
    discount1: {},
    discount2: {},
    discountPercentage1: {},
    discountPercentage2: {},
    freight: {},
    freightPercentage: {},
    charges: {},
    chargesPercentage: {},
    totalNetValue: {},
    totalCost: {},
    totalProfit: {},
    exempt: {},
    taxBase1: {},
    taxBase2: {},
    taxBase3: {},
    tax1: {},
    tax2: {},
    tax3: {},
    total: {},
    cash: {},
    credit: {},
    temporal: {},
    pending: {},
    originId: {},
    sessionId: {}
  }, {
    classMethods: {
      associate: function () {
        this.hasMany  (models.SaleDetails,      { as: 'details',       foreignKey: 'ventas_correlativo'   });
        this.hasOne   (models.SalePaymentMethod,{ as: 'paymentMethod', foreignKey: 'venta_correlativo'    });
        this.hasOne   (models.SaleTaxes,        { as: 'taxes',         foreignKey: 'ventas_correlativo'   });
        this.belongsTo(models.Salesman,         { as: 'seller',        foreignKey: 'vendedor_correlativo' });
        this.belongsTo(models.Customer,         { as: 'customer',      foreignKey: 'cliente_correlativo'  });
        this.belongsTo(models.Currency,         { as: 'currency',      foreignKey: 'moneda_correlativo'   });
      }
    }
  }];
};
