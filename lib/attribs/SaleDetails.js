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
    serviceProviderId: {
      field: 'servidor_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    productId: {
      field: 'producto_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'dat_productos',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    productName: {
      field: 'producto_nombre',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
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
    unitId: {
      field: 'unidad_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    },
    primaryUnitId: {
      field: 'unidad_principal_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'dat_unidades',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    secondaryUnitId: {
      field: 'unidad_secundaria_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'dat_unidades',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    unitConversionFactor: {
      field: 'unidad_factor_conversion',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    quantity1: {
      field: 'cantidad',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    quantity2: {
      field: 'cantidad_2',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    bonusItems: {
      field: 'cantidad_bonificada',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    unitPrice: {
      field: 'precio_unitario',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    priceType: {
      field: 'tipo_precio',
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 0,
      validate: {

      }
    },
    totalQuantity: {
      field: 'total_cantidad',
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
    discount3: {
      field: 'descuento_3',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    discount4: {
      field: 'descuento_4',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    discount5: {
      field: 'descuento_5',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    discount6: {
      field: 'descuento_6',
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
      defaultValue: 0
    },
    discountPercentage2: {
      field: 'porc_descuento_2',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    discountPercentage3: {
      field: 'porc_descuento_3',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    discountPercentage4: {
      field: 'porc_descuento_4',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    discountPercentage5: {
      field: 'porc_descuento_5',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    discountPercentage6: {
      field: 'porc_descuento_6',
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
    cost: {
      field: 'costo',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    profit: {
      field: 'utilidad',
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
    taxPercentage1: {
      field: 'porc_impuesto_1',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    taxPercentage2: {
      field: 'porc_impuesto_2',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    taxId1: {
      field: 'impuesto_1_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'cfg_impuestos',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    taxId2: {
      field: 'impuesto_2_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'cfg_impuestos',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    productHasSize: {
      field: 'producto_usa_talla',
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'F',
      validate: {

      }
    },
    productHasColor: {
      field: 'producto_usa_color',
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'F',
      validate: {

      }
    },
    productHasSerial: {
      field: 'producto_usa_serial',
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'F',
      validate: {

      }
    },
    productHasLot: {
      field: 'producto_usa_lote',
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
      //references: {
      //  model: 'sys_sesiones',
      //  key: 'correlativo'
      //},
      validate: {

      }
    }
  }, {
    tableName: 'dat_ventas_detalles',
    validate: {
      //POST_VALIDACIONES
    }
  }];
};
