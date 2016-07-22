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
    stationId: {
      field: 'estacion_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
      //references: {
      //  model: 'cfg_estaciones',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    userId: {
      field: 'usuario_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'cfg_usuarios',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    sellerId: {
      field: 'vendedor_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'dat_vendedores',
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
    customerId: {
      field: 'cliente_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'dat_clientes',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    kind: {
      field: 'tipo_persona',
      type: DataTypes.CHAR(2),
      allowNull: false,
      defaultValue: 'NO',
      validate: {

      }
    },
    customerFullName: {
      field: 'cliente_nombre',
      type: DataTypes.STRING(160),
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    customerName: {
      field: 'cliente_nombre_1',
      type: DataTypes.STRING(35),
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    customerMiddleName: {
      field: 'cliente_nombre_2',
      type: DataTypes.STRING(35),
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    customerSurname: {
      field: 'cliente_apellido_1',
      type: DataTypes.STRING(35),
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    customerSecondSurname: {
      field: 'cliente_apellido_2',
      type: DataTypes.STRING(35),
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    customerFiscalId1: {
      field: 'cliente_id_fiscal_1',
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    customerFiscalId2: {
      field: 'cliente_id_fiscal_2',
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    timezone: {
      field: 'zona_horaria',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    timezoneId: {
      field: 'zona_horaria_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      //references: {
      //  model: 'sys_zonas_horarias',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    document: {
      field: 'documento',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    documentType: {
      field: 'tipo_documento',
      type: DataTypes.CHAR(3),
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    issuedAt: {
      field: 'fecha_emision',
      type: DataTypes.DATE,
      allowNull: true,
      validate: {

      }
    },
    issuedTime: {
      field: 'hora_emision',
      type: DataTypes.TIME,
      allowNull: true,
      validate: {

      }
    },
    validDays: {
      field: 'dias_vencimiento',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    expiresAt: {
      field: 'fecha_vencimiento',
      type: DataTypes.DATE,
      allowNull: true,
      validate: {

      }
    },
    itemsTotalGrossValue: {
      field: 'total_bruto_renglones',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    itemsDiscount: {
      field: 'descuentos_renglones',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    itemsCharges: {
      field: 'cargos_renglones',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    totalGrossValue: {
      field: 'total_bruto',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    discount1: {
      field: 'descuento_1',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    discount2: {
      field: 'descuento_2',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    discountPercentage1: {
      field: 'porc_descuento_1',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    discountPercentage2: {
      field: 'porc_descuento_2',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    freight: {
      field: 'flete',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    freightPercentage: {
      field: 'porc_flete',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    charges: {
      field: 'cargos',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    chargesPercentage: {
      field: 'porc_cargos',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    totalNetValue: {
      field: 'total_neto',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    totalCost: {
      field: 'total_costo',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    totalProfit: {
      field: 'total_utilidad',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    exempt: {
      field: 'exento',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    taxBase1: {
      field: 'base_impuesto_1',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    taxBase2: {
      field: 'base_impuesto_2',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    taxBase3: {
      field: 'base_impuesto_3',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    tax1: {
      field: 'impuesto_1',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    tax2: {
      field: 'impuesto_2',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    tax3: {
      field: 'impuesto_3',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    total: {
      field: 'total_operacion',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    cash: {
      field: 'contado',
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
    temporal: {
      field: 'temporal',
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'F',
      validate: {

      }
    },
    pending: {
      field: 'pendiente',
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'F',
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
    tableName: 'dat_ventas',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
