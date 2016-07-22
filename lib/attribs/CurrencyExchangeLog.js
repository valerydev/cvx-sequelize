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
    exchangeId: {
      field: 'conversion_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: 'logUniqueIdx',
      validate: {

      }
    },
    createdAt: {
      field: 'fecha_hora',
      type: DataTypes.DATE,
      allowNull: false,
      unique: 'logUniqueIdx',
      validate: {

      }
    },
    factor: {
      field: 'factor',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 1,
      validate: {

      }
    },
    value: {
      field: 'valor_conversion',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 1,
      validate: {

      }
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
    tableName: 'dat_monedas_conversion_historial',
    validate: {

    }
  }]
};
