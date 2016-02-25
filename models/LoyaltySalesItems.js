/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {
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
