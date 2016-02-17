module.exports = function(sequelize, Sequelize) {
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
