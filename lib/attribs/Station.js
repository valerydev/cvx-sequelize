/* jshint indent: 2 */
module.exports = function(DataTypes) {

  return [{
    id: {
      field: 'correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {

      }
    },
    contractId: {
      field: 'contrato_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'cfg_contratos',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    classifierId1: {
      field: 'clasificacion_1_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
      //references: {
      //  model: 'cfg_clasificacion_sucursales',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    classifierId2: {
      field: 'clasificacion_2_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
      //references: {
      //  model: 'cfg_clasificacion_sucursales',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    classifierId3: {
      field: 'clasificacion_3_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
      //references: {
      //  model: 'cfg_clasificacion_sucursales',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    branchId: {
      field: 'sucursal_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
      //references: {
      //  model: 'cfg_sucursales',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    deviceToken: {
      field: 'identificacion_dispositivo',
      type: DataTypes.STRING(160),
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    name: {
      field: 'nombre',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    type: {
      field: 'tipo',
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    notes: {
      field: 'notas',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    }
  }, {
    tableName: 'cfg_estaciones',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
