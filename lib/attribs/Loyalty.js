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
    classifierId1: {
      field: 'clasificacion_1_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      //references: {
      //  model: 'cfg_clasificacion_sucursales',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    classifierId2: {
      field: 'clasificacion_2_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      //references: {
      //  model: 'cfg_clasificacion_sucursales',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    classifierId3: {
      field: 'clasificacion_3_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      //references: {
      //  model: 'cfg_clasificacion_sucursales',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    branchId: {
      field: 'sucursal_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      //references: {
      //  model: 'cfg_sucursales',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    customerId: {
      field: 'cliente_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      //references: {
      //  model: 'clientes',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    groupId: {
      field: 'grupo_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'dat_fid_grupos_clientes',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    branchMembershipId: {
      field: 'sucursal_afiliacion_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    },
    salesmanMembershipId: {
      field: 'vendedor_afiliacion_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {

      }
    },
    code: {
      field: 'codigo',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    qrCode: {
      field: 'codig_qr',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    signupDate: {
      field: 'fecha_hora_registro',
      type: DataTypes.DATE,
      allowNull: true,
      validate: {

      }
    },
    identityCard: {
      field: 'identificacion_personal',
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    name: {
      field: 'nombres',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    surname: {
      field: 'apellidos',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    email: {
      field: 'correo_electronico',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    birthDate: {
      field: 'fecha_nacimiento',
      type: DataTypes.DATE,
      allowNull: true,
      validate: {

      }
    },
    occupation: {
      field: 'ocupacion',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    gender: {
      field: 'sexo',
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    socialNetwork1: {
      field: 'red_social_1',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    socialNetwork2: {
      field: 'red_social_2',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    socialNetwork3: {
      field: 'red_social_3',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    socialNetwork4: {
      field: 'red_social_4',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    phoneNumber1: {
      field: 'telefono_1',
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: '',
      validate: {}
    },
    phoneNumber2: {
      field: 'telefono_2',
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    }
  },{
    tableName: 'dat_fid_clientes',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
