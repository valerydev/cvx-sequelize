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
    tableName: 'dat_direcciones',
    classMethods: {
       associate: function () {
       }
    }
  }];
};
