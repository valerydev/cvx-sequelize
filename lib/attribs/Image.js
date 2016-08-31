/* jshint indent: 2 */
module.exports = function(DataTypes) {
  return [{
    id: {
      field: 'correlativo',
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {

      }
    },
    contractId: {
      field: 'contrato_correlativo',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      roles: {
        client: false
      },
      validate: {

      }
    },
    type: {
      field: 'tipo',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {

      }
    },
    module: {
      field: 'modulo',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {

      }
    },
    image: {
      field: 'imagen',
      type: DataTypes.BLOB,
      allowNull: false,
      validate: {
        isBase64: { msg: "Los valores tipo Blob deben enviarse codificados en Base64" }
      }
    },
    originId: {
      field: 'correlativo_origen',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    sessionId: {
      field: 'identificacion_origen',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {

      }
    }
  },{
    tableName: 'dat_imagenes',
    validate: {

    }
  }];
};
