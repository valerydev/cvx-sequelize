/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {
  return [{
    id: {},
    contractId: {},
    classifierId1: {},
    classifierId2: {},
    classifierId3: {},
    branchId: {},
    clientId: {},
    groupId: {},
    branchMembershipId: {},
    salesmanMembershipId: {},
    code: {},
    qrCode: {},
    signupDate: {},
    name: {},
    lastname: {},
    email: {},
    birthDate: {},
    occupation: {},
    gender: {},
    socialNetwork1: {},
    socialNetwork2: {},
    socialNetwork3: {},
    socialNetwork4: {}
  },{
    classMethods: {
      associate: function () {
        this.belongsTo(sequelize.models.LoyaltyGroup, { foreignKey: 'grupo_correlativo' });
      }
    }
  }];
};
