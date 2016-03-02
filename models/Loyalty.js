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
    socialNetwork4: {},
    phoneNumber1: {},
    phoneNumber2: {}
  },{
    hooks: {
      beforeCreate: function (loyalty, options) {
        var contractId = loyalty.contractId;
        return sequelize.transaction().then(function (tx) {
          return sequelize.models.LoyaltyCodeSequence.getNextCode(contractId)
            .then(function (code) {
              tx.commit();
              loyalty.code = code;
              loyalty.qrCode = code;
            }).catch(function (err) {
              tx.rollback();
              throw err;
            })
        });
      }
    },

    classMethods: {
      associate: function () {
        this.belongsTo(sequelize.models.LoyaltyGroup, {foreignKey: 'grupo_correlativo'});
      }
    }
  }];
};
