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
    itemId: {},
    departmentId: {},
    unitId: {},
    quantity: {},
    price: {},
    priceType: {},
    total: {},
    discount: {},
    pointsByItems: {},
    pointsByDepartments: {},
    totalPoints: {}
  },{
    classMethods: {
      associate: function () {
      }
    }
  }];
};
