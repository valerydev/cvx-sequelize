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
    geolocation: {}
  }, {
    classMethods: {
       associate: function () {
         this.belongsTo(sequelize.models.Supplier, {as: 'supplier', foreignKey: 'entidad_correlativo', scope: { entity: 'PRV' }, constraints: false});
       }
    }
  }];
};
