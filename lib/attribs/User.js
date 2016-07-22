/* jshint indent: 2 */
module.exports = function(DataTypes, Sequelize) {
  return [{
    id: {
      field: 'correlativo',
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
      validate: {

      }
    },
    contractId: {
      field: 'contrato_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      roles: {
        client: false
      },
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
      type: DataTypes.STRING,
      allowNull: true,
      validate: {

      }
    },
    password: {
      field: 'clave',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      roles: {
        client: false
      },
      validate: {

      }
    },
    fullName: {
      field: 'nombres',
      type: DataTypes.STRING,
      allowNull: true,
      validate: {

      }
    },
    email: {
      field: 'correo_electronico',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {
        isEmail: true
      }
    },
    securityQuestion1: {
      field: 'pregunta_seguridad',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    securityAnswer1: {
      field: 'respuesta_seguridad',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    type: {
      field: 'tipo',
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'S',
      validate: {

      }
    },
    profileId: {
      field: 'perfil_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {

      }
    },
    ocuppationId: {
      field: 'cargo_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {

      }
    },
    visibilityScope: {
      field: 'nivel_consolidacion',
      type: DataTypes.INTEGER(10),
      allowNull: true,
      validate: {

      }
    },
    active: {
      field: 'activo',
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'T',
      validate: {

      }
    },
    securityQuestion2: {
      field: 'pregunta_seguridad_2',
      type: DataTypes.STRING,
      allowNull: true,
      validate: {

      }
    },
    securityAnswer2: {
      field: 'respuesta_seguridad_2',
      type: DataTypes.STRING,
      allowNull: true,
      validate: {

      }
    },
    allowedIPs: {
      field: 'ip_permitidas',
      type: DataTypes.STRING,
      allowNull: true,
      validate: {

      }
    },
    address: {
      field: 'direccion',
      type: DataTypes.STRING,
      allowNull: true,
      validate: {

      }
    },
    countryId: {
      field: 'pais_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {

      }
    },
    stateId: {
      field: 'provincia_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {

      }
    },
    cityId: {
      field: 'ciudad_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {

      }
    },
    subLocationId1: {
      field: 'sublocalidad1_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {

      }
    },
    subLocationId2: {
      field: 'sublocalidad2_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {

      }
    },
    photoId: {
      field: 'foto_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {

      }
    },
    connectionScheduleId: {
      field: 'horario_conexion_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {

      }
    },
    disabledMenus: {
      field: 'menu_deshabilitado',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {
        is: /(\d+([,]\d+)+)*/,
        isUnique: function(value){
          value = value.split(',');
          if(Sequelize.Utils._.uniq(value).length < value.length) {
            throw new Error('disabledMenus no puede contener valores repetidos');
          }
        }
      }
    }
  },{
    tableName: 'cfg_usuarios',
    validate: {

    }
  }];
};
