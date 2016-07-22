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
    contractId: {
      field: "contrato_correlativo",
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'cfg_contratos',
      //  key: 'correlativo'
      //},
      roles: {
        client: false
      },
      validate: {

      }
    },
    classifierId1: {
      field: "clasificacion_1_correlativo",
      type: DataTypes.BIGINT,
      allowNull: true,
      //references: {
      //  model: 'cfg_clasificacion_sucursales',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    classifierId2: {
      field: "clasificacion_2_correlativo",
      type: DataTypes.BIGINT,
      allowNull: true,
      //references: {
      //  model: 'cfg_clasificacion_sucursales',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    classifierId3: {
      field: "clasificacion_3_correlativo",
      type: DataTypes.BIGINT,
      allowNull: true,
      //references: {
      //  model: 'cfg_clasificacion_sucursales',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    branchId: {
      field: "sucursal_correlativo",
      type: DataTypes.BIGINT,
      alowNull: true,
      //references: {
      //  model: 'cfg_sucursales',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    sysCurrencyId: {
      field: 'sys_moneda_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
      }
    },
    customExchange: {
      field: 'conversion_manual',
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'F'
    },
    primary: {
      field: 'principal',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    active: {
      field: 'activo',
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'T',
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
    tableName: 'dat_monedas',
    validate: {

    }
  }];
};
