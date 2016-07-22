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
    supplierId: {
      field: 'proveedor_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false,
      //references: {
      //  model: 'Supplier',
      //  key: 'id'
      //}
    },
    code: {
      field: 'codigo_interno',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    lastDiscountPercentage: {
      field: 'ultimo_porc_descuento_1',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    lastDiscountPercentage2: {
      field: 'ultimo_porc_descuento_2',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    lastDiscountPercentage3: {
      field: 'ultimo_porc_descuento_3',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    lastDiscountPercentage4: {
      field: 'ultimo_porc_descuento_4',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    lastDiscountPercentage5: {
      field: 'ultimo_porc_descuento_5',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    lastDiscountPercentage6: {
      field: 'ultimo_porc_descuento_6',
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    deliveryDays: {
      field: 'dias_de_entrega',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 0
    },
    warrantyDays: {
      field: 'dias_garantia',
      type: DataTypes.INTEGER(11),
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
    tableName: 'dat_productos_proveedores',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
