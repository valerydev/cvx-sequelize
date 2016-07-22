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
    criteriaId: {
      field: 'criterio_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'dat_fid_criterios_puntos',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    itemId: {
      field: 'producto_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'productos',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    unitId: {
      field: 'unidad_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'unidades',
      //  key: 'correlativo'
      //},
      validate: {

      }
    },
    quantity: {
      field: 'cantidad',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    points: {
      field: 'puntos',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    maxOperationPoints: {
      field: 'puntos_maximo_por_operacion',
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    }
  },{
    tableName: 'dat_fid_criterios_puntos_productos',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
