/* jshint indent: 2 */
module.exports = function(DataTypes) {
  return [{
    id: {
      field: 'correlativo',
      type: DataTypes.BIGINT(20),
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
    entity: {
      field: 'entidad',
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {

      }
    },
    accessLevel: {
      field: 'nivel',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    }
  },{
    tableName: 'cfg_contrato_consolidacion',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
