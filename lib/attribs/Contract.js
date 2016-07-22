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
    number: {
      field: 'numero',
      type: DataTypes.STRING,
      allowNull: false,
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
    endDate: {
      field: 'fecha_final',
      type: DataTypes.DATE,
      allowNull: true,
      validate: {

      }
    },
    active: {
      field: 'activo',
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'F',
      validate: {

      }
    },
    shortName: {
      field: 'nombre_corto',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
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
    brandName: {
      field: 'nombre_marca_comercial',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    fiscalId1: {
      field: 'id_fiscal_1',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    fiscalId2: {
      field: 'id_fiscal_2',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    fiscalId3: {
      field: 'id_fiscal_3',
      type: DataTypes.STRING,
      allowNull: true,
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
    contactEmail: {
      field: 'correoe_contacto_principal',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    secondaryContact: {
      field: 'contacto_secundario',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    secondaryContactEmail: {
      field: 'correoe_contacto_secundario',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    technicalContact: {
      field: 'contacto_tecnico',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    technicalContactEmail: {
      field: 'correoe_contacto_tecnico',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    businessEmail: {
      field: 'correoe_empresa',
      type: DataTypes.STRING,
      allowNull: true,
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
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    timezone: {
      field: 'zona_horaria',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '00:00',
      validate: {

      }
    },
    web: {
      field: 'web',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    facebook: {
      field: 'facebook',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    twitter: {
      field: 'twitter',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    instagram: {
      field: 'instagram',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    googleplus: {
      field: 'googleplus',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    pinterest: {
      field: 'pinterest',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    linkedin: {
      field: 'linkedin',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    },
    publicProfile: {
      field: 'perfil_publico',
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'F',
      validate: {

      }
    },
    mainUserId: {
      field: 'usuario_principal_correlativo',
      type: DataTypes.BIGINT(20),
      allowNull: true,
      validate: {

      }
    },
    logoId: {
      field: 'logotipo_correlativo',
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

      }
    },
    timezoneId: {
      field: 'zona_horaria_correlativo',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      validate: {

      }
    }
  },{
    tableName: 'cfg_contratos',
    validate: {

    }
  }];
};
