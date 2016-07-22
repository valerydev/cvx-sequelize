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
    currencyId1: {
      field: 'correlativo_moneda_1',
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: 'currenciesUniqueIdx',
      validate: {

      }
    },
    currencyId2: {
      field: 'correlativo_moneda_2',
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: 'currenciesUniqueIdx',
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
    type: {
      field: 'tipo_conversion',
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: '1',
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
    }
  },{
    tableName: 'sys_monedas_conversion',
    validate: {

    }
  }]
};
