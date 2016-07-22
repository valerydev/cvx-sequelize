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
    code: {
      field: 'codigo',
      type: DataTypes.STRING,
      allowNull: false,
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
    symbol: {
      field: 'simbolo',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {

      }
    },
    active: {
      field: 'activo',
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'T',
      validate: {

      }
    }
  },{
    tableName: 'sys_monedas',
    validate: {

    }
  }]
};
