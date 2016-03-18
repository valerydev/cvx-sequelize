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
    classMethods: {
      associate: function () {
        this.hasMany(sequelize.models.Contact, { as: 'contact', foreignKey: 'entidad_correlativo', scope: { entity: 'PRV' }, constraints: false });
        this.hasMany(sequelize.models.Address, { as: 'address', foreignKey: 'entidad_correlativo', scope: { entity: 'PRV' }, constraints: false });
        //this.belongsTo(sequelize.models.Language, { as: 'language' foreignKey: 'idioma_correlativo' });
      }
    }
  }];
};
