/* jshint indent: 2 */
module.exports = function(DataTypes) {
  return [{
    id: {
      field: 'correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    productId: {
      field: 'producto_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'Product',
      //  key: 'id'
      //}
    },
    editableDescription: {
      field: 'editar_descripcion',
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'F'
    },
    forSale: {
      field: 'venta',
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'F'
    },
    buyable: {
      field: 'compra',
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'F'
    },
    composite: {
      field: 'compuesto',
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'F'
    },
    consignment: {
      field: 'consignacion',
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'F'
    },
    internal: {
      field: 'uso_interno',
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'F'
    },
    fractioned: {
      field: 'fraccionado',
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'F'
    },
    hasSerial: {
      field: 'serializado',
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'F'
    },
    size: {
      field: 'talla',
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'F'
    },
    color: {
      field: 'color',
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'F'
    },
    composedCodingMethod: {
      field: 'metodo_codigo_compuesto',
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'C'
    },
    franchiseProfitPercentage: {
      field: 'porc_utilidad_franquicia',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    imported: {
      field: 'producto_importado',
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'F'
    },
    warrantyDays: {
      field: 'dias_garantia_general',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 0
    },
    passwordProtectedSale: {
      field: 'requiere_clave_para_venta',
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'F'
    },
    originId: {
      field: 'correlativo_origen',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
      validate: {

      }
    },
    sessionId: {
      field: 'identificacion_origen',
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {

      }
    }
  }, {
    tableName: 'dat_productos_opciones',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
