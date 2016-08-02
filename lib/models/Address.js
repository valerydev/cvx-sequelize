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
    timezoneId: {},
    geolocation: {},
    originId: {},
    sessionId: {}
  }, {
    classMethods: {
       associate: function () {
       }
    }
  }];
};