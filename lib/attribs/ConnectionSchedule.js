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
    name: {
      field: 'nombre',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {

      }
    },
    indicator: {
      field: 'indicador',
      type: DataTypes.STRING(1),
      allowNull: true,
      validate: {

      }
    }
  }, {
    tableName: 'cfg_horario_conexion',
    validate: {

    }
  }];
};
