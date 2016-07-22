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
      field: 'venta_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'dat_ventas',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    currencyId: {
      field: 'moneda_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'dat_monedas',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    currencyExchangeFactor: {
      field: 'moneda_factor',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 1,
      validate: {

      }
    },
    cash: {
      field: 'efectivo',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    check: {
      field: 'cheque',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    debitCard: {
      field: 'tarjeta_debito',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    creditCard: {
      field: 'tarjeta_credito',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    coupon: {
      field: 'cupon',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    giftCard: {
      field: 'tarjeta_regalo',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    bankTransfer: {
      field: 'transferencia_banco',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    bankDeposit: {
      field: 'deposito_banco',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    bonusCard: {
      field: 'tarjeta_alimenticia',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    totalCash: {
      field: 'total_contado',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    creditNote: {
      field: 'nota_credito',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    withholding1: {
      field: 'retencion_1',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    withholding2: {
      field: 'retencion_2',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    credit: {
      field: 'credito',
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
      validate: {

      }
    }
  }, {
    tableName: 'dat_ventas_forma_pago',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
