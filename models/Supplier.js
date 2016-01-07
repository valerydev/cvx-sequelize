/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {
  return [{
    id: {},
    contractId: {},
    classifierId1: {},
    classifierId2: {},
    classifierId3: {},
    branchId: {},
    code: {},
    name: {},
    fiscalDenomination: {},
    fiscalId1: {},
    fiscalId2: {},
    creditDays: {},
    creditLimit: {},
    defaultCurrencyId: {},
    languageId: {}

  }, {
    tableName: 'dat_proveedores',
    classMethods: {
      associate: function () {
        this.hasMany(sequelize.models.Contact, { foreignKey: 'entidad_correlativo' });
        this.hasMany(sequelize.models.Address, { foreignKey: 'entidad_correlativo' });
      }
    }
  }];
};
