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
      validate: {

      }
    },
    currencyId: {
      field: 'moneda_correlativo',
      type: DataTypes.BIGINT,      
      allowNull: false,
      validate: {

      }
    }, 
    currencyFactor: {
      field: 'factor_moneda',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 1,
      validate: {

      }
    },
    specialCurrencyFactor: {
      field: 'factor_moneda_particular',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 1,
      validate: {

      }
    },  
    maxPrice: {
      field: 'precio_maximo',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    }, 
    offerPrice: {
      field: 'precio_oferta',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    higherPrice: {
      field: 'precio_mayor',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    lowerPrice: {
      field: 'precio_minimo',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    extraPrice1: {
      field: 'precio_adicional_1',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    extraPrice2: {
      field: 'precio_adicional_2',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    maxPricePercentage: {
      field: 'porc_precio_maximo',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    }, 
    offerPricePercentage: {
      field: 'porc_precio_oferta',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },  
    higherPricePercentage: {
      field: 'porc_precio_mayor',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    lowerPricePercentage: {
      field: 'porc_precio_minimo',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    extraPricePercentage1: {
      field: 'porc_precio_adicional_1',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    extraPricePercentage2: {
      field: 'porc_precio_adicional_2',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },      
    roundMethod: {
      field: 'metodo_redondeo',
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '9',
      validate: {

      }
    },      
    roundWithTaxIncluded: {
      field: 'redondear_con_impuesto_incluido',
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'F',
      validate: {

      }
    },      
    defaultPriceType: {
      field: 'tipo_precio_defecto',
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '1',
      validate: {

      }
    },      
    decimalPrecision: {
      field: 'numero_decimales',
      type: DataTypes.BIGINT,      
      allowNull: false,
      defaultValue: 2,        
      validate: {

      }
    },    
    altMaxPrice: {
      field: 'precio_maximo_alt',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    }, 
    altOfferPrice: {
      field: 'precio_oferta_alt',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    altHigherPrice: {
      field: 'precio_mayor_alt',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    altLowerPrice: {
      field: 'precio_minimo_alt',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    altExtraPrice1: {
      field: 'precio_adicional_1_alt',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    altExtraPrice2: {
      field: 'precio_adicional_2_alt',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    altMaxPricePercentage: {
      field: 'porc_precio_maximo_alt',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    }, 
    altOfferPricePercentage: {
      field: 'porc_precio_oferta_alt',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },  
    altHigherPricePercentage: {
      field: 'porc_precio_mayor_alt',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    altLowerPricePercentage: {
      field: 'porc_precio_minimo_alt',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    altExtraPricePercentage1: {
      field: 'porc_precio_adicional_1_alt',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    altExtraPricePercentage2: {
      field: 'porc_precio_adicional_2_alt',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    altRoundMethod: {
      field: 'metodo_redondeo_alt',
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '9',
      validate: {

      }
    },   
    altRoundWithTaxIncluded: {
      field: 'redondear_con_impuesto_incluido_alt',
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'F',
      validate: {

      }
    },   
    altDefaultPriceType: {
      field: 'tipo_precio_defecto_alt',
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '1',
      validate: {

      }
    },
    altDecimalPrecision: {
      field: 'numero_decimales_alt',
      type: DataTypes.BIGINT,      
      allowNull: false,
      defaultValue: 2,        
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
      
  },{
    tableName: 'dat_productos_precios',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
