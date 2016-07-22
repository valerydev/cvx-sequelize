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
      roles: {
        client: false
      },
      validate: {

      }
    },
    classifierId1: {
      field: 'clasificacion_1_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    },
    classifierId2: {
      field: 'clasificacion_2_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    },
    classifierId3: {
      field: 'clasificacion_3_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    },
    code: {
      field: 'sucursal_codigo',
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
    contact: {
      field: 'contacto_principal',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    startDate: {
      field: 'fecha_inicio',
      type: DataTypes.DATE,
      allowNull: true,
      validate: {

      }
    },
    countryId: {
      field: 'pais_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      validate: {

      }
    },
    stateId: {
      field: 'provincia_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      validate: {

      }
    },
    cityId: {
      field: 'ciudad_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      validate: {

      }
    },
    subLocationId1: {
      field: 'sublocalidad1_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      validate: {

      }
    },
    subLocationId2: {
      field: 'sublocalidad2_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      validate: {

      }
    },
    postalCode: {
      field: 'zona_postal',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    timezoneId: {
      field: 'zona_horaria_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
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
    address: {
      field: 'direccion',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    phoneNumbers: {
      field: 'telefonos',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    propertyType: {
      field: 'tipo_propiedad',
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'F',
      validate: {

      }
    }
  },{
    tableName: 'cfg_sucursales',
    validate: {

    }
  }];
};
