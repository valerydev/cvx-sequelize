/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {
  return [{
    id: {},
    contractId: {},
    entity: {},
    entityId: {},
    kind: {},
    order: {},
    address: {},
    referencePoint: {},
    countryId: {},
    stateId: {},
    cityId: {},
    subLocationId1: {},
    subLocationId2: {},
    postalCode: {},
    timezone: {},
    geolocation: {}
  }, {
    classMethods: {
       associate: function () {
         this.belongsTo(sequelize.models.Supplier, {foreignKey: 'entidad_correlativo', scope: { entity: 'PRV' }, constraints: false});
       }
    }
  }];
};
