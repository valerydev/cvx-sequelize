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
      allowNull: false,
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
    shortName : {
        field: 'nombre_corto',
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
        validate: {

        }
    },  
      
    type: {
      field: 'tipo_producto',
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'T',
      validate: {

      }
    },  
    categoryId: {
      field: 'categoria_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    },
    reference: {
      field: 'referencia',
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },  
    brandId: {
      field: 'marca_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    },
    model: {
      field: 'modelo',
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    primaryUnitId: {
      field: 'unidad_principal_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    },  
    secondaryUnitId: {
      field: 'unidad_secundaria_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    },  
    costMethod: {
      field: 'metodo_costo',
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'U',
      validate: {

      }
    },
    status: {
      field: 'estatus',
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'A',
      validate: {

      }
    },
    notes: {
      field: 'notas',
      type: DataTypes.STRING(160),
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
    tableName: 'dat_productos',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
