/* jshint indent: 2 */

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
      field: 'contrato_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    },
    classifierId1: {
      field: 'clasificacion_1_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {

      }
    },
    classifierId2: {
      field: 'clasificacion_2_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {

      }
    },
    classifierId3: {
      field: 'clasificacion_3_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {

      }
    },
    branchId: {
      field: 'sucursal_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {

      }
    },
    code: {
      field: 'codigo',
      type: DataTypes.STRING,
      allowNull: true,
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
    roundType: {
      field: 'metodo_redondeo',
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '0',
      validate: {

      }
    },
    size: {
      field: 'talla',
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'F',
      validate: {

      }
    },
    color: {
      field: 'color',
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'F',
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
    productsDependecy: {
      field: 'dependencia_productos',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    level: {
      field: 'nivel',
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    parentId: {
      field: 'categoria_padre_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    },
    path: {
      field: 'codigos_de_ascendencia',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    notes: {
      field: 'notas',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
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
    tableName: 'dat_categorias',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
