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
      allowNull: false
    },
    saleTaxId1: {
      field: 'impuesto1_venta_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false      
      //references: {
      //  model: 'cfg_impuestos',
      //  key: 'correlativo'
      //}
    },
    saleTaxId2: {
      field: 'impuesto2_venta_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0      
      //references: {
      //  model: 'cfg_impuestos',
      //  key: 'correlativo'
      //}
    },
    saleTaxId3: {
      field: 'impuesto3_venta_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0      
      //references: {
      //  model: 'Taxes',
      //  key: 'id'
      //}
    },
    buyTaxId1: {
      field: 'impuesto1_compra_correlativo',
      type: DataTypes.BIGINT,
      allowNull: false
      //references: {
      //  model: 'Taxes',
      //  key: 'id'
      //}
    },
    buyTaxId2: {
      field: 'impuesto2_compra_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
      //references: {
      //  model: 'Taxes',
      //  key: 'id'
      //}
    },
    buyTaxId3: {
      field: 'impuesto3_compra_correlativo',
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0      
      //references: {
      //  model: 'Taxes',
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
    tableName: 'dat_productos_impuestos',
    validate: {
      //POST-VALIDACIONES
    }
  }];
};
