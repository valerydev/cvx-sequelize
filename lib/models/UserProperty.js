/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    userId: {},
    propertyId: {},
    value: {},
    updatedAt: {}
  },{
    classMethods: {
      associate: function () {}
    }
  }];
};
