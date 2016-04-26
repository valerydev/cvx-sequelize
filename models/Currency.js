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
