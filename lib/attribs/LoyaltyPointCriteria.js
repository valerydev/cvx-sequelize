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
    createdAt: {
      field: 'fecha_hora_creado',
      type: DataTypes.DATE,
      allowNull: true,
      validate: {

      }      
    },
    validSince: {
      field: 'vigencia_desde',
      type: DataTypes.DATE,
      allowNull: true,
      validate: {

      }      
    },
    expires: {
      field: 'vigencia_hasta',      
      type: DataTypes.DATE,
      allowNull: true,
      validate: {

      }      
    },
    description: {
      field: 'descripcion',      
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {

      }      
    },
    byMembership: {
      field: 'puntos_afiliacion',      
      type: DataTypes.INTEGER(6),
      allowNull: true,
      defaultValue: '0',
      validate: {

      }
    },
    byVisits: {
      field: 'puntos_visita',      
      type: DataTypes.INTEGER(6),
      allowNull: true,
      defaultValue: '0',
      validate: {

      }
    },
    pointExpiryMonths: {
      field: 'vigencia_puntos_acumulados',      
      type: DataTypes.INTEGER(6),
      allowNull: true,
      defaultValue: '0',
      validate: {

      }
    },
    byMembershipAnniversary: {
      field: 'puntos_aniversario_afiliacion',      
      type: DataTypes.INTEGER(6),
      allowNull: true,
      defaultValue: '0',
      validate: {

      }
    },
    byCustomerBirthday: {
      field: 'puntos_aniversario_cliente',      
      type: DataTypes.INTEGER(6),
      allowNull: true,
      defaultValue: '0',
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
    deactivatedAt: {
      field: 'fecha_hora_desactivacion',
      type: DataTypes.DATE,
      allowNull: true,
      validate: {

      }
    }
  },{
    tableName: 'dat_fid_criterios_puntos',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
