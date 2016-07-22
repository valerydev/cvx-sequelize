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
    unitId: {
      field: 'unidad_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'Unit',
      //  key: 'id'
      //}
    },
    height: {
      field: 'alto',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    width: {
      field: 'ancho',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    length: {
      field: 'largo',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    weight: {
      field: 'peso',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    metricUnitId: {
      field: 'unidad_metrica_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      //references: {
      //  model: 'Unit',
      //  key: 'id'
      //}
    },
    volume: {
      field: 'volumen',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'dat_productos_medidas',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
