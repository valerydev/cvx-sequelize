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
    cardId: {},
    createdAt: {},
    issuedAt: {},
    documentType: {},
    document: {},
    documentId: {},
    total: {},
    currencyId: {},
    pointsByItems: {},
    pointsByDepartments: {},
    salesPerson: {},
    userId: {},
    pointsByAmmount: {},
    pointsByVisit: {}
  },{
    classMethods: {
      associate: function () {
        this.hasMany( models.LoyaltySalesItems, { as: "items", foreignKey: 'venta_correlativo' });
      }
    }
  }];
};
