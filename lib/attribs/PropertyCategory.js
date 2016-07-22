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
    name: {
      field: 'nombre',
      type: DataTypes.STRING,
      allowNull: true,
      validate: {

      }
    },
    createdAt: {
      field: 'fecha_creado',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {

      }
    },
    updatedAt: {
      field: 'ultima_modificacion',
      type: DataTypes.DATE,
      allowNull: true,
      validate: {

      }
    }
  },{
    tableName: 'sys_propiedades_secciones',
    validate: {

    }
  }];
};
