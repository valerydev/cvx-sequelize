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
    classifierId1: {},
    classifierId2: {},
    classifierId3: {},
    branchId: {},
    code: {},
    name: {},
    originId: {},
    sessionId: {}
  },{
    transactionLog: true,
    classMethods: {
      associate: function () {
        this.belongsTo(models.Contract,         { as: 'contract',    foreignKey: 'contrato_correlativo'        });
        this.belongsTo(models.Branch,           { as: 'branch',      foreignKey: 'sucursal_correlativo'        });
        this.belongsTo(models.BranchClassifier, { as: 'classifier1', foreignKey: 'clasificacion_1_correlativo' });
        this.belongsTo(models.BranchClassifier, { as: 'classifier2', foreignKey: 'clasificacion_2_correlativo' });
        this.belongsTo(models.BranchClassifier, { as: 'classifier3', foreignKey: 'clasificacion_3_correlativo' });
        this.hasMany  (models.UnitConversion,   { as: 'conversions', foreignKey: 'correlativo_unidad_1'        });
      }
    },
    defaultScope: function(){
      return this.scopes.includeConversions();
    },
    scopes: {
      includeConversions: function(where) {
        return {
          include: [
            { model: models.UnitConversion, as: 'conversions', required: false, where: where||{} }
          ]
        }
      },
      shortInfo: function(){
        return {
          attributes: ['id', 'name', 'code']
        }
      }
    }
  }];
};
