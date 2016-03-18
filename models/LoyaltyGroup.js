/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {
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
        this.hasMany(sequelize.models.Loyalty, { as: 'loyalties', foreignKey: 'grupo_correlativo' });
      }
    }
  }];
};

