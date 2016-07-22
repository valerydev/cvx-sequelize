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
      //references: {
      //  model: 'cfg_contratos',
      //  key: 'correlativo'
      //},
      roles: {
        client: false
      },
      validate: {

      }
    },
    entity: {
      field: 'entidad',
      type: DataTypes.STRING(3),
      allowNull: false,
      validate: {

      }
    },
    entityId: {
      field: 'entidad_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    },
    kind: {
      field: 'tipo',
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'CON',
      validate: {

      }
    },
    order: {
      field: 'orden',
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: '1',
      validate: {

      }
    },
    address: {
      field: 'direccion',
      type: DataTypes.STRING(160),
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    referencePoint: {
      field: 'punto_referencia',
      type: DataTypes.STRING(160),
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    countryId: {
      field: 'pais_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      //references: {
      //  model: 'sys_paises',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    stateId: {
      field: 'provincia_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      //references: {
      //  model: 'sys_provincias',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    cityId: {
      field: 'ciudad_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      //references: {
      //  model: 'sys_ciudades',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    subLocationId1: {
      field: 'sublocalidad1_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      //references: {
      //  model: 'sys_sublocalidades_1',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    subLocationId2: {
      field: 'sublocalidad2_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      //references: {
      //  model: 'sys_sublocalidades_2',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    postalCode: {
      field: 'zona_postal',
      type: DataTypes.STRING(7),
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    timezone: {
      field: 'zona_horaria',
      type: DataTypes.STRING(7),
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
      validate: {

      }
    },
    geolocation: {
      field: 'geolocalizacion',
      type: DataTypes.STRING(26),
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
    tableName: 'dat_direcciones',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
