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
    paymentMethodId: {
      field: 'formapago_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'dat_ventas_forma_pago',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    type: {
      field: 'tipo',
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    amount: {
      field: 'monto',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    referenceId: {
      field: 'referencia_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    bankId: {
      field: 'banco_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    number: {
      field: 'numero',
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
      validate: {

      }
    }
  }, {
    tableName: 'dat_ventas_forma_pago_detalle',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
