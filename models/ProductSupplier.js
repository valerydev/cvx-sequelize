module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    productId: {},
    supplierId: {},
    code: {},
    lastDiscountPercentage: {},
    lastDiscountPercentage2: {},
    lastDiscountPercentage3: {},
    lastDiscountPercentage4: {},
    lastDiscountPercentage5: {},
    lastDiscountPercentage6: {},
    deliveryDays: {},
    warrantyDays: {}
  }, {
    classMethods: {
      associate: function () {

      }
    }
  }];
};
