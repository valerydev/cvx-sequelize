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
    profileId: {
      field: 'perfil_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      roles: {
        client: false
      },
      references: {
        model: 'Profile',
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
      allowNull: true,
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
    tableName: 'cfg_perfiles_propiedades',
    validate: {

    }
  }];
};
