/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

    //.from(_self.tableName)
    //.innerJoin('monedas', 'monedas_conversion.correlativo_moneda_2', 'monedas.correlativo')
    //.where('correlativo_moneda_1', id1)
    //.andWhere('correlativo_moneda_1','<>','correlativo_moneda_2' )

  return [{
    id: {},
    contractId: {},
    classifierId1: {},
    classifierId2: {},
    classifierId3: {},
    branchId: {},
    code: {},
    name: {}
  },{
    classMethods: {
      associate: function () {
        this.belongsTo(models.Contract, { as: 'contract', foreignKey: 'contrato_correlativo' });
        this.belongsTo(models.Branch,   { as: 'branch',   foreignKey: 'sucursal_correlativo' });
        this.belongsTo(models.BranchClassifier, { as: 'classifier1', foreignKey: 'clasificacion_1_correlativo'  });
        this.belongsTo(models.BranchClassifier, { as: 'classifier2', foreignKey: 'clasificacion_2_correlativo' });
        this.belongsTo(models.BranchClassifier, { as: 'classifier3', foreignKey: 'clasificacion_3_correlativo' });
        this.hasMany(models.UnitConversion.scope('notSameUnits'), { as: 'conversions', foreignKey: 'correlativo_unidad_1' });
      }
    }
  }];
};
