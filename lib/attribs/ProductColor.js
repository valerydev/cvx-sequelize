/* jshint indent: 2 */
module.exports = function(DataTypes) {
  return [{
    id: {
      field: 'correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    contractId: {
      field: 'contrato_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'Contract',
      //  key: 'id'
      //}
    },
    classifierId1: {
      field: 'clasificacion_1_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      //references: {
      //  model: 'BranchClassifier',
      //  key: 'id'
      //}
    },
    classifierId2: {
      field: 'clasificacion_2_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      //references: {
      //  model: 'BranchClassifier',
      //  key: 'id'
      //}
    },
    classifierId3: {
      field: 'clasificacion_3_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      //references: {
      //  model: 'BranchClassifier',
      //  key: 'id'
      //}
    },
    branchId: {
      field: 'sucursal_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      //references: {
      //  model: 'Branch',
      //  key: 'id'
      //}
    },
    code: {
      field: 'codigo',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    name: {
      field: 'nombre',
      type: DataTypes.STRING,
      allowNull: false
    },
    originId: {
      field: 'correlativo_origen',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
      validate: {

      }
    },
    sessionId: {
      field: 'identificacion_origen',
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {

      }
    }
  }, {
    tableName: 'dat_colores',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
