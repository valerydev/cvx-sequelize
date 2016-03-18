/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {
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
        this.hasMany(sequelize.models.LoyaltySalesItems, { as: "items", foreignKey: 'venta_correlativo' });
      }
    }
  }];
};
