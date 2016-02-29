module.exports = function(sequelize, Sequelize) {
  return [{
    id: {},
    contractId: {},
    classifierId1: {},
    classifierId2: {},
    classifierId3: {},
    branchId: {},
    code: {},
    name: {},
    symbol: {},
    principal: {},
    active: {},
    sysCurrency: {}
  }, {
    scopes: {
      active: { where: { active: true } }
    },
    classMethods: {
      associate: function () {

      }
    }
  }]
};