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
        this.belongsTo(sequelize.models.Contract, { foreignKey: 'contrato_correlativo', as: 'contract' });
        this.belongsTo(sequelize.models.BranchClassifier, { as: 'classifier1', foreignKey: 'clasificacion_1_correlativo'  });
        this.belongsTo(sequelize.models.BranchClassifier, { as: 'classifier2', foreignKey: 'clasificacion_2_correlativo' });
        this.belongsTo(sequelize.models.BranchClassifier, { as: 'classifier3', foreignKey: 'clasificacion_3_correlativo' });
      }
    },
  scopes:{

    includeClassifiers: function(){
      var BranchClassifier = sequelize.models.BranchClassifier;
      return {
        include:[
          {model:BranchClassifier,  as:'classifier1'},
          {model:BranchClassifier,  as:'classifier2'},
          {model:BranchClassifier,  as:'classifier3'}
        ]
      }
    }

  }

  }];
};
