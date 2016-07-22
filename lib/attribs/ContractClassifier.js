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
      roles: {
        client: false
      },
      validate: {

      }
    },
    level: {
      field: 'nivel',
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: '1',
      validate: {

      }
    },
    name: {
      field: 'nombre',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    }
  },{
    tableName: 'cfg_clasificaciones_contratos',
    validate: {

    }
  }];
};
