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
    productWarehouseId: {
      field: 'producto_almacen_correlativo',
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
    inStock2: {
      field: 'existencia_2_actual',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    reserved: {
      field: 'existencia_comprometida',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    reserved2: {
      field: 'existencia_2_comprometida',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    pendingDispatch: {
      field: 'existencia_pendiente_despacho',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    pendingDispatch2: {
      field: 'existencia_2_pendiente_despacho',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    consigned: {
      field: 'existencia_consignacion',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    consigned2: {
      field: 'existencia_2_consignacion',
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
