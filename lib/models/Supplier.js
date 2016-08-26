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
    languageId: {},
    originId: {},
    sessionId: {}

  }, {
    classMethods: {
      associate: function () {
        this.hasMany( models.Contact, { as: 'contacts', foreignKey: 'entidad_correlativo', scope: { entity: 'PRV' }, constraints: false });
        this.hasMany( models.Address, { as: 'addresses', foreignKey: 'entidad_correlativo', scope: { entity: 'PRV' }, constraints: false });
        this.belongsTo(models.Language, { as: 'language', foreignKey: 'idioma_correlativo' });
        this.belongsTo(models.Currency, { as: 'currency', foreignKey: 'moneda_defecto_correlativo' });
      }
    },
    scopes: {
      includeCurrency: function(){
        return {
          include: [
            { as: 'currency', model: models.Currency.scope('shortInfo', 'includeSysCurrency') }
          ]
        }
      }
    }
  }];
};
