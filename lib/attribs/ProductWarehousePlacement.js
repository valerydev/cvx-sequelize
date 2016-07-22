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
    warehousePlacementId: {
      field: 'ubicacion_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'WarehousePlacement',
      //  key: 'id'
      //}
    },
    inStock: {
      field: 'existencia_actual',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    inStock2: {
      field: 'existencia_2_actual',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
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
    tableName: 'dat_productos_almacenes_ubicaciones',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
