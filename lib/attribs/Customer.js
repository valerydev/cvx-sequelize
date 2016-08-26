/* jshint indent: 2 */
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
      validate: {

      }
    },
    classifierId1: {
      field: 'clasificacion_1_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
      validate: {

      }
    },
    classifierId2: {
      field: 'clasificacion_2_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
      validate: {

      }
    },
    classifierId3: {
      field: 'clasificacion_3_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
      validate: {

      }
    },
    branchId: {
      field: 'sucursal_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
      validate: {

      }
    },
    code: {
      field: 'codigo',
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    kind: {
      field: 'tipo_persona',
      type: DataTypes.CHAR(7),
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    fullName: {
      field: 'nombre',
      type: DataTypes.STRING(160),
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    name: {
      field: 'nombre_1',
      type: DataTypes.STRING(35),
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    middleName: {
      field: 'nombre_2',
      type: DataTypes.STRING(35),
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    surname: {
      field: 'apellido_1',
      type: DataTypes.STRING(35),
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    secondSurname: {
      field: 'apellido_2',
      type: DataTypes.STRING(35),
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    imageId: {
      field: 'imagen_1',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    fiscalId1: {
      field: 'id_fiscal_1',
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    fiscalId2: {
      field: 'id_fiscal_2',
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    groupId: {
      field: 'grupo_clientes_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    sellerId: {
      field: 'vendedor_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
      validate: {

      }
    },
    priceListId: {
      field: 'lista_precios_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
      validate: {

      }
    },
    discountPercentage1: {
      field: 'porc_descuento_1',
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {

      }
    },
    discountPercentage2: {
      field: 'porc_descuento_2',
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {

      }
    },
    notes: {
      field: 'notas',
      type: DataTypes.STRING(160),
      allowNull: false,
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
  }, {
    tableName: 'dat_clientes',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
