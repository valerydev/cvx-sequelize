/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {
  return [{
    id: {},
    contractId: {},
    createdAt: {},
    validSince: {},
    expires: {},
    description: {},
    byMembership: {},
    byVisits: {},
    pointExpiryMonths: {},
    byMembershipAnniversary: {},
    byCustomerBirthday: {},
    active: {},
    deactivatedAt: {}
  },{
    classMethods: {
      associate: function () {
        this.hasMany(sequelize.models.LoyaltyPointByAmountCriteria,     { as: 'byAmount',     foreignKey: 'criterio_correlativo' });
        this.hasMany(sequelize.models.LoyaltyPointByDepartmentCriteria, { as: 'byDepartment', foreignKey: 'criterio_correlativo' });
        this.hasMany(sequelize.models.LoyaltyPointByItemCriteria,       { as: 'byItem',       foreignKey: 'criterio_correlativo' });
      }
    }
  }];
};
