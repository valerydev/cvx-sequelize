/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {
  return [{
    id: {},
    contractId: {},
    classifierId1: {},
    classifierId2: {},
    classifierId3: {},
    code: {},
    name: {},
    contact: {},
    startDate: {},
    countryId: {},
    stateId: {},
    cityId: {},
    subLocationId1: {},
    subLocationId2: {},
    postalCode: {},
    timezoneId: {},
    timezone: {},
    address: {},
    phoneNumbers: {},
    propertyType: {}
  },{
    classMethods: {
      associate: function () {
        this.belongsTo(sequelize.models.Contract, { foreignKey: 'contrato_correlativo', as: 'contract' })
        this.belongsTo(sequelize.models.BranchClassifier, { foreignKey: 'clasificacion_1_correlativo', as: 'classifier1' });
        this.belongsTo(sequelize.models.BranchClassifier, { foreignKey: 'clasificacion_2_correlativo', as: 'classifier2' });
        this.belongsTo(sequelize.models.BranchClassifier, { foreignKey: 'clasificacion_3_correlativo', as: 'classifier3' });
      }
    }
  }];
};
