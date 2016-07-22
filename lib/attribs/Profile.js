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
    branchId: {
      field: 'sucursal_correlativo',
      type: DataTypes.BIGINT,
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
    active: {
      field: 'activo',
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'T',
      validate: {

      }
    },
    disabledMenus: {
      field: 'menu_deshabilitado',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {

      }
    }
  },{
    tableName: 'cfg_perfiles',
    validate: {

    }
  }];
};
