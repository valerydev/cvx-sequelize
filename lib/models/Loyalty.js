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
    classifierId1: {},
    classifierId2: {},
    classifierId3: {},
    branchId: {},
    customerId: {},
    groupId: {},
    branchMembershipId: {},
    salesmanMembershipId: {},
    code: {},
    qrCode: {},
    signupDate: {},
    identityCard: {},
    name: {},
    surname: {},
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
        return sequelize.transaction({autocommit: false}).then(function (tx) {
          return models.LoyaltyCodeSequence.getNextCode(contractId)
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
        this.belongsTo(models.LoyaltyGroup, { as: 'group', foreignKey: 'grupo_correlativo' });
      }
    }
  }];
};
