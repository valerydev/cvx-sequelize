/* jshint indent: 2 */
module.exports = function(DataTypes) {
  return [{
    id: {
      field: "correlativo",
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {}
    },
    name: {
      field: "nombre",
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    translatedName: {
      field: "nombre_original",
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    code: {
      field: "nomenclatura",
      type: DataTypes.STRING(3),
      allowNull: true,
      defaultValue: ''
    }

  }, {
    tableName: 'sys_idiomas',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
