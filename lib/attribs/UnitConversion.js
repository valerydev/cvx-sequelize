/* jshint indent: 2 */
module.exports = function(DataTypes) {
  return [{
    id: {
      field: 'correlativo',
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {

      }
    },
    unitId1: {
      field: 'correlativo_unidad_1',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    },
    unitId2: {
      field: 'correlativo_unidad_2',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    },
    factor: {
      field: 'factor',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 1,
      validate: {

      }
    },
    type: {
      field: 'tipo_conversion',
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '1',
      validate: {
        gt: 0
      }
    },
    value: {
      field: 'valor_conversion',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 1,
      validate: {

      }
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
  },{
    tableName: 'dat_unidades_conversion',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
