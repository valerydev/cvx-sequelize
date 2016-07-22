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
    saleId: {
      field: 'venta_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'dat_fid_ventas',
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
    departmentId: {
      field: 'departamento_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'departamentos',
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
    price: {
      field: 'precio',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    priceType: {
      field: 'tipo_precio',
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '1',
      validate: {

      }
    },
    total: {
      field: 'total',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    discount: {
      field: 'descuento',
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    pointsByItems: {
      field: 'puntos_productos',
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    pointsByDepartments: {
      field: 'punto_departamento',
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    },
    totalPoints: {
      field: 'total_puntos',
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: 0,
      validate: {

      }
    }
  },{
    tableName: 'dat_fid_ventas_productos',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
