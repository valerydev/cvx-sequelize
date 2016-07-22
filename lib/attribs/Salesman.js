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
    code: {
      field: 'codigo',
      type: DataTypes.STRING,
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
    fiscalId1: {
      field: 'id_fiscal_1',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    fiscalId2: {
      field: 'id_fiscal_2',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    originId: {
      field: 'correlativo_origen',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    sessionId: {
      field: 'identificacion_origen',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'sys_sesiones',
      //  key: 'correlativo'
      //},
      validate: {

      }
    }
  }, {
    tableName: 'dat_vendedores',
    validate: {
      //POST_VALIDACIONES
    }
  }];
};
