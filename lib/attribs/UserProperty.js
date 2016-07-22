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
    userId: {
      field: 'usuario_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
      validate: {

      }
    },
    propertyId: {
      field: 'propiedad_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Property',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
      validate: {

      }
    },
    value: {
      field: 'valor',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {

      }
    },
    updatedAt: {
      field: 'ultima_actualizacion',
      type: DataTypes.DATE,
      allowNull: true,
      validate: {

      }
    }
  },{
    tableName: 'cfg_usuarios_propiedades',
    validate: {

    }
  }];
};
