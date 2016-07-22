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
    sizeId: {
      field: 'talla_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      //references: {
      //  model: 'ProductSize',
      //  key: 'id'
      //}
    },
    colorId: {
      field: 'color_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      //references: {
      //  model: 'ProductColor',
      //  key: 'id'
      //}
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
    tableName: 'dat_productos_tallascolores',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
