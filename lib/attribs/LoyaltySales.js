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
    branchId: {
      field: 'sucursal_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'cfg_sucursales',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    cardId: {
      field: 'carnet_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'cfg_unknown',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    createdAt: {
      field: 'fecha_emision',
      type: DataTypes.DATE,
      allowNull: false,
      validate: {

      }
    },
    issuedAt: {
      field: 'hora_emision',
      type: DataTypes.DATE,
      allowNull: false,
      validate: {

      }
    },
    documentType: {
      field: 'tipo_documento',
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'UKN',
      validate: {

      }
    },
    document: {
      field: 'documento',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'UKN',
      validate: {

      }
    },
    documentId: {
      field: 'correlativo_documento',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    total: {
      field: 'total',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    currencyId: {
      field: 'moneda_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'monedas',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    pointsByItems: {
      field: 'puntos_productos',
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    pointsByDepartments: {
      field: 'puntos_departamentos',
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    salesPerson: {
      field: 'vendedor_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    },
    userId: {
      field: 'usuario_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    },
    pointsByAmmount: {
      field: 'puntos_monto',
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    pointsByVisit: {
      field: 'puntos_visita',
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    }
  },{
    tableName: 'dat_fid_ventas',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
