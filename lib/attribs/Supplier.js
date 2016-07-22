/* jshint indent: 2 */
module.exports = function(DataTypes) {
  return [{
    id: {
      field: "correlativo",
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {

      }
    },
    contractId: {
      field: "contrato_correlativo",
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
      field: "clasificacion_1_correlativo",
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
      field: "clasificacion_2_correlativo",
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
      field: "clasificacion_3_correlativo",
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
      field: "sucursal_correlativo",
      type: DataTypes.BIGINT,
      alowNull: true,
      //references: {
      //  model: 'cfg_sucursales',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    code: {
      field: "codigo",
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    name: {
      field: "nombre",
      type: DataTypes.STRING(160),
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    fiscalDenomination: {
      field: "denominacion_fiscal",
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: 'XX',
      validate: {

      }
    },
    fiscalId1: {
      field: "id_fiscal_1",
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    fiscalId2: {
      field: "id_fiscal_2",
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    creditDays: {
      field: "dias_credito",
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: 0
    },
    creditLimit: {
      field: "limite_credito",
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    defaultCurrencyId: {
      field: "moneda_defecto_correlativo",
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      //references: {
      //  model: 'monedas',
      //  key: 'correlativo'
      //}
    },
    languageId: {
      field: "idioma_correlativo",
      type: DataTypes.BIGINT,
      //allowNull: false
      //references: {
      //  model: 'sys_idiomas',
      //  key: 'correlativo'
      //},
      //onDelete: 'CASCADE',
      //onUpdate: 'CASCADE'
    },
    originId: {
      field: 'correlativo_origen',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    sessionId: {
      field: 'identificacion_origen',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    }

  },{
    tableName: 'dat_proveedores',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
