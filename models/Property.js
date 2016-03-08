/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {
  return [{
    id: {},
    countryId: {},
    code: {},
    parentCode: {},
    position: {},
    categoryId: {},
    displayType: {},
    dataType: {},
    valueList: {},
    isGroup: {},
    name: {},
    auditDescription: {},
    help: {},
    auditable: {},
    config: {},
    configurableByContract: {},
    configurableByBranch: {},
    configurableByProfile: {},
    configurableByUser: {},
    defaultValue: {},
    active: {},
    internal: {}
  },{
    classMethods: {
      associate: function () {
        this.belongsTo( sequelize.models.PropertyCategory, { foreignKey: 'seccion_correlativo',  as: 'category' });
      }
    },
    getterMethods: {
      value: function() {
        return (this.getDataValue('UserProperty')    ||
                this.getDataValue('ProfileProperty') ||
                this.getDataValue('ContractProperty')).value;
      }
    }
  }];
};
