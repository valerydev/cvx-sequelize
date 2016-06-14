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
    code: {},
    name: {}
  },{
    classMethods: {
      associate: function () {
        this.belongsTo(models.Contract, { as: 'contract', foreignKey: 'contrato_correlativo' });
        this.hasOne( models.Address, { as: 'address', foreignKey: 'entidad_correlativo', scope: { entity: 'ALM' }, constraints: false });
        this.hasMany( models.Contact, { as: 'contacts', foreignKey: 'entidad_correlativo', scope: { entity: 'ALM' }, constraints: false });
      }
    }
  }];
};