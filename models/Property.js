/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;
  var validator = Sequelize.Validator;

  return [{
    id: {},
    countryId: {},
    code: {},
    parentCode: {},
    position: {},
    categoryId: {},
    displayType: {},
    dataType: {},
    valueList: {
      get: function(){
        var valueList = this.getDataValue('valueList');
        if(valueList){
          if(validator.isJSON(valueList)) {
            return _.flatten([JSON.parse(valueList)]);
          } else if(typeof valueList == 'string'){
            return valueList.split(',');
          } else {
            return [];
          }
        }
      },
      set: function(values){

      }
    },
    isGroup: {},
    name: {},
    auditDescription: {},
    help: {},
    auditable: {},
    customConfiguration: {},
    configurableByContract: {},
    configurableByBranch: {},
    configurableByProfile: {},
    configurableByUser: {},
    defaultValue: {
      get: function() {
        return (this.getDataValue('defaultValue')    ||
                this.getDataValue('ProfileProperty') ||
                this.getDataValue('ContractProperty')|| {}).value;
      }
    },
    active: {},
    internal: {}
  },{
    classMethods: {
      associate: function () {
        this.belongsTo( models.PropertyCategory, { as: 'category', foreignKey: 'seccion_correlativo' });
      }
    },
    //TODO: Probar si es posible obtener y modificar el valor de la propiedad mediante getter/setter
    getterMethods: {
      value: function() {
        return (this.getDataValue('UserProperty')     ||
                this.getDataValue('ProfileProperty')  ||
                this.getDataValue('ContractProperty') || {}).value;
      }
    },
    //setterMethods: {
    //  value: val => {
    //    this.setDataValue('UserProperty', val);
    //  }
    //},
    defaultScope: function() {
      return this.scopes.includeCategory();
    },
    scopes: {
      includeCategory: function(where) {
        return {
          include: [
            {
              model: models.PropertyCategory,
              as: 'category',
              required: false
            }
          ],
          where: where
        }
      }
    }
  }];

};
