/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

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
        try {
          var posValues = JSON.parse(this.getDataValue('valueList'));
          if (posValues.browse) {
            try {
              parseInt(posValues.browse);
              return posValues;
            } catch(e){
              e = new Error('Codigo de busqueda (browse) debe ser entero, se encontro: ' + posValues.browse);
              console.error(e);
              throw e;
            }

          }
        } catch(err) {
          return [];
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
    getterMethods: {
      value: function() {
        return (this.getDataValue('UserProperty')     ||
                this.getDataValue('ProfileProperty')  ||
                this.getDataValue('ContractProperty') || {}).value;
      },
    },
    defaultScope: function() {
      return {
        include: [
          {
            model: models.PropertyCategory,
            as: 'category',
            required: true
          }
        ]
      }
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
