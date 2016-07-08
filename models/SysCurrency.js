module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    code: {},
    name: {},
    symbol: {},
    timezone: {},
    active: {}
  }, {
    classMethods: {
      associate: function () {

      }
    },
    defaultScope: { where: { active: true } },
    scopes: {
      active: { where: { active: true } }
    }
  }]
};
