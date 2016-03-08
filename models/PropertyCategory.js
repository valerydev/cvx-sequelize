/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {
  return [{
    id: {},
    name: {},
    createdAt: {},
    updatedAt: {}
  },{
    classMethods: {
      associate: function () {
        this.hasMany( sequelize.models.Property, { foreignKey: 'seccion_correlativo',  as: 'properties' });
      }
    }
  }];
};
