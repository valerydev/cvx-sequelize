/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    saleId: {},
    currencyId: {},
    currencyExchangeFactor: {},
    cash: {},
    check: {},
    debitCard: {},
    creditCard: {},
    coupon: {},
    giftCard: {},
    bankTransfer: {},
    bankDeposit: {},
    bonusCard: {},
    totalCash: {},
    creditNote: {},
    withholding1: {},
    withholding2: {},
    credit: {},
    originId: {},
    sessionId: {}
  }, {
    transactionLog: true,
    classMethods: {
      associate: function () {
        this.hasOne   (models.SalePaymentMethodDetails, { as: 'details', foreignKey: 'formapago_correlativo' });
      }
    }
  }];
};
