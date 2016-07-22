/* jshint indent: 2 */
module.exports = function(DataTypes) {
  return [{
    id: {
      field: "correlativo",
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {}
    },
    contractId: {
      field: "contrato_correlativo",
      type: DataTypes.BIGINT,
      allowNull: false,
      roles: {
        client: false
      },
      validate: {}
    },
    entity: {
      field: "entidad",
      type: DataTypes.STRING(3),
      allowNull: false,
      validate: {}
    },
    entityId: {
      field: "entidad_correlativo",
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {}
    },
    kind: {
      field: "tipo",
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'CON',
      validate: {}
    },
    line: {
      field: "linea",
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: '1',
      validate: {}
    },
    order: {
      field: "orden",
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: '1',
      validate: {}
    },
    value: {
      field: "valor",
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
      validate: {}
    },
    description: {
      field: "descripcion",
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
      validate: {}
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
  }, {
    tableName: 'dat_contactos',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
