/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {
  return [{
    id: {},
    number: {},
    startDate: {},
    endDate: {},
    active: {},
    shortName: {},
    name: {},
    brandName: {},
    fiscalId1: {},
    fiscalId2: {},
    fiscalId3: {},
    contact: {},
    contactEmail: {},
    secondaryContact: {},
    secondaryContactEmail: {},
    technicalContact: {},
    technicalContactEmail: {},
    businessEmail: {},
    address: {},
    phoneNumbers: {},
    countryId: {},
    stateId: {},
    cityId: {},
    subLocationId1: {},
    subLocationId2: {},
    postalCode: {},
    timezone: {},
    web: {},
    facebook: {},
    twitter: {},
    instagram: {},
    googleplus: {},
    pinterest: {},
    linkedin: {},
    publicProfile: {},
    mainUserId: {},
    logoId: {},
    disabledMenus: {},
    timezoneId: {}
  },{
    classMethods: {
      associate: function () {
        this.hasMany(   sequelize.models.User,   { foreignKey: 'contrato_correlativo',          as: 'users' });
        this.belongsTo( sequelize.models.User,   { foreignKey: 'usuario_principal_correlativo', as: 'mainUser' });
        this.belongsTo( sequelize.models.Image,  { foreignKey: 'logotipo_correlativo',          as: 'logo'  });
        this.belongsToMany( sequelize.models.Property, {
          through: sequelize.models.ContractProperty,
          as: 'properties',
          foreignKey: 'contrato_correlativo',
          otherKey: 'propiedad_correlativo'
        });
      }
    }
  }];
};
