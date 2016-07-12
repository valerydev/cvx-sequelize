/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    criteriaId: {},
    itemId: {},
    unitId: {},
    quantity: {},
    points: {},
    maxOperationPoints: {}
  },{
    classMethods: {
      associate: function () {
      }
    }
  }];
};
