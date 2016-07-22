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
    warehouseId: {
      field: 'almacen_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'Warehouse',
      //  key: 'id'
      //}
    },
    placement: {
      field: 'ubicacion',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'dat_almacenes_ubicacion',
    validate: {

    }
  }];
};
