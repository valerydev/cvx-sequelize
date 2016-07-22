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
    countryId: {
      field: 'pais_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    },
    code: {
      field: 'codigo',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      validate: {

      }
    },
    parentCode: {
      field: 'padre_codigo',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      validate: {

      }
    },
    position: {
      field: 'posicion',
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0',
      validate: {

      }
    },
    categoryId: {
      field: 'seccion_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    },
    displayType: {
      field: 'tipo_valor',
      type: DataTypes.STRING(2),
      allowNull: true,
      defaultValue: 'vu',
      validate: {

      }
    },
    dataType: {
      field: 'tipo_dato',
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'C',
      validate: {

      }
    },
    valueList: {
      field: 'lista_valores_posibles',
      type: DataTypes.STRING(1024),
      allowNull: true,
      validate: {

      }
    },
    isGroup: {
      field: 'es_grupo',
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'F',
      validate: {

      }
    },
    name: {
      field: 'nombre',
      type: DataTypes.STRING,
      allowNull: true,
      validate: {

      }
    },
    auditDescription: {
      field: 'descripion_auditoria',
      type: DataTypes.STRING(1024),
      allowNull: true,
      validate: {

      }
    },
    help: {
      field: 'texto_ayuda',
      type: DataTypes.STRING(1024),
      allowNull: true,
      validate: {

      }
    },
    auditable: {
      field: 'auditable',
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'F',
      validate: {

      }
    },
    customConfiguration: {
      field: 'configuracion_particular',
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'F',
      validate: {

      }
    },
    configurableByContract: {
      field: 'configurable_contrato',
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'F',
      validate: {

      }
    },
    configurableByBranch: {
      field: 'configurable_sucursal',
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'F',
      validate: {

      }
    },
    configurableByProfile: {
      field: 'configurable_perfil',
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'F',
      validate: {

      }
    },
    configurableByUser: {
      field: 'configurable_usuario',
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'F',
      validate: {

      }
    },
    defaultValue: {
      field: 'valor_por_defecto',
      type: DataTypes.STRING(1024),
      allowNull: true,
      validate: {

      }
    },
    active: {
      field: 'activo',
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'F',
      validate: {

      }
    },
    internal: {
      field: 'uso_interno',
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'X',
      validate: {

      }
    }
  },{
    tableName: 'sys_propiedades_generales',
    validate: {

    }
  }];
};
