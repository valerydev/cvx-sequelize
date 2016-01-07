/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {
  return [{
    id: {},
    contractId: {},
    entity: {},
    entityId: {},
    kind: {},
    line: {},
    order: {},
    value: {},
    description: {}
  }, {
    classMethods: {
      associate: function () {
        this.belongsTo(sequelize.models.Supplier, {foreignKey: 'entidad_correlativo', scope: { entity: 'PRV' }, constraints: false});
      }
    }
  }];
};
