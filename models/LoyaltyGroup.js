/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {

  var fn  = Sequelize.fn;
  var col = Sequelize.col;
  var literal = Sequelize.literal;
  var models = sequelize.models;

  return [{
    id: {},
    contractId: {},
    classifierId1: {},
    classifierId2: {},
    classifierId3: {},
    branchId: {},
    name:{}
  },{
    classMethods: {
      associate: function () {
        this.hasMany( models.Loyalty, { as: 'loyalties', foreignKey: 'grupo_correlativo' });
      }
    }
  }];
};

