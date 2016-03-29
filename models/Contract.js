/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {

  var fn  = Sequelize.fn;
  var col = Sequelize.col;
  var literal = Sequelize.literal;
  var models = sequelize.models;

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
        this.hasMany  ( models.User,   { as: 'users',    foreignKey: 'contrato_correlativo'          });
        //this.belongsTo( models.User,   { as: 'mainUser', foreignKey: 'usuario_principal_correlativo' }); //FIXME: Da problema de dependencia ciclica
        this.belongsTo( models.Image,  { as: 'logo',     foreignKey: 'logotipo_correlativo'          });
        this.belongsToMany( models.Property, {
          through: models.ContractProperty,
          as: 'properties',
          foreignKey: 'contrato_correlativo',
          otherKey: 'propiedad_correlativo'
        });
      }
    }
  }];
};
