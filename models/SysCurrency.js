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
    scopes: {
      active: { where: { active: true } }
    },
    classMethods: {
      associate: function () {

      }
    }
  }]
};
