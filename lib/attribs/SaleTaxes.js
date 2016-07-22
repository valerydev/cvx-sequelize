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
    saleId: {
      field: 'ventas_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'dat_ventas',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    taxId: {
      field: 'impuesto_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'cfg_impuestos',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    base: {
      field: 'base',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    tax: {
      field: 'impuesto',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    taxPercentage: {
      field: 'porc_impuesto',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
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
    tableName: 'dat_ventas_impuestos',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
