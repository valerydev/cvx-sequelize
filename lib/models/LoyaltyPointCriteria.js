/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

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
        this.hasMany( models.LoyaltyPointByAmountCriteria,     { as: 'byAmount',     foreignKey: 'criterio_correlativo' });
        this.hasMany( models.LoyaltyPointByDepartmentCriteria, { as: 'byDepartment', foreignKey: 'criterio_correlativo' });
        this.hasMany( models.LoyaltyPointByItemCriteria,       { as: 'byItem',       foreignKey: 'criterio_correlativo' });
      }
    }
  }];
};
