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
    productId: {
      field: 'producto_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'Product',
      //  key: 'id'
      //}
    },
    classifierId1: {
      field: 'clasificacion_1_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
      //references: {
      //  model: 'BranchClassifier',
      //  key: 'id'
      //}
    },
    classifierId2: {
      field: 'clasificacion_2_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
      //references: {
      //  model: 'BranchClassifier',
      //  key: 'id'
      //}
    },
    classifierId3: {
      field: 'clasificacion_3_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
      //references: {
      //  model: 'BranchClassifier',
      //  key: 'id'
      //}
    },
    branchId: {
      field: 'sucursal_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
      //references: {
      //  model: 'Branch',
      //  key: 'id'
      //}
    },
    currencyId: {
      field: 'moneda_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'Currency',
      //  key: 'id'
      //}
    },
    currencyFactor: {
      field: 'factor_moneda',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 1
    },
    specialCurrencyFactor: {
      field: 'factor_moneda_particular',
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'F'
    },
    grossPrice: {
      field: 'costo_bruto',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    discount1: {
      field: 'descuento_1',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    discount2: {
      field: 'descuento_2',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    discount3: {
      field: 'descuento_3',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    discount4: {
      field: 'descuento_4',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    discount5: {
      field: 'descuento_5',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    discount6: {
      field: 'descuento_6',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    discountPercentage1: {
      field: 'porc_descuento_1',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    discountPercentage2: {
      field: 'porc_descuento_2',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    discountPercentage3: {
      field: 'porc_descuento_3',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    discountPercentage4: {
      field: 'porc_descuento_4',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    discountPercentage5: {
      field: 'porc_descuento_5',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    discountPercentage6: {
      field: 'porc_descuento_6',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    bonusUnits: {
      field: 'descuento_bonificacion',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    unitCost: {
      field: 'costo_unitario',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    addedCost1: {
      field: 'costo_agregado_1',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    addedCost2: {
      field: 'costo_agregado_2',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    addedCost3: {
      field: 'costo_agregado_3',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    addedCost4: {
      field: 'costo_agregado_4',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    addedCostPercentage1: {
      field: 'porc_costo_agregado_1',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    addedCostPercentage2: {
      field: 'porc_costo_agregado_2',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    addedCostPercentage3: {
      field: 'porc_costo_agregado_3',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    addedCostPercentage4: {
      field: 'porc_costo_agregado_4',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    importCost: {
      field: 'costo_importacion',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    calculedCost: {
      field: 'costo_calculado',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    unitAverageCost: {
      field: 'costo_unitario_promedio',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    calculatedAverageCost: {
      field: 'costo_calculado_promedio',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    initialCalculatedCost: {
      field: 'costo_calculado_inicial',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    initialUnitAverageCost: {
      field: 'costo_unitario_promedio_inicial',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: '0'
    },
    initialCalculatedAverageCost: {
      field: 'costo_calculado_promedio_inicial',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    decimalPrecision: {
      field: 'numero_decimales',
      type: DataTypes.INTEGER(4),
      allowNull: true
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
    tableName: 'dat_productos_costos',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
