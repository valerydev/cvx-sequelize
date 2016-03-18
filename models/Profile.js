/* jshint indent: 2 */
var _ = require('lodash');

module.exports = function(sequelize, Sequelize) {
  return [{
    id: {},
    contractId: {},
    branchId: {},
    code: {},
    name: {
      get: function(){
        return this.getDataValue('name') || '';
      }
    },
    active: {},
    disabledMenus: {}
  },{
    classMethods: {
      associate: function () {
        this.belongsTo(sequelize.models.Contract, { as: 'contract', foreignKey: 'contrato_correlativo' });
        this.hasMany(  sequelize.models.User,     { as: 'users',    foreignKey: 'perfil_correlativo'   });
        this.belongsToMany( sequelize.models.Property, {
          through: sequelize.models.ProfileProperty,
          as: 'properties',
          foreignKey: 'perfil_correlativo',
          otherKey: 'propiedad_correlativo'
        });
      }
    },
    getterMethods: {
      cascadeProperties: function() {
        return _.unionBy(this.properties, (this.contract||{}).properties, 'code');
      }
    }
  }];
};
