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
    warehouseId: {
      field: 'almacen_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'Warehouse',
      //  key: 'id'
      //}
    },
    min: {
      field: 'existencia_minima',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    max: {
      field: 'existencia_maxima',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    reorder: {
      field: 'punto_reorden',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    current: {
      field: 'existencia_actual',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    current2: {
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
    requested: {
      field: 'existencia_solicitada',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    requested2: {
      field: 'existencia_2_solicitada',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    ordered: {
      field: 'existencia_ordenada',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    ordered2: {
      field: 'existencia_2_ordenada',
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
    tableName: 'dat_productos_almacenes',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
