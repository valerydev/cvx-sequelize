/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {
  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

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
        this.belongsTo( models.Supplier, { as: 'supplier', foreignKey: 'entidad_correlativo', scope: { entity: 'PRV' }, constraints: false});
      }
    }
  }];
};
