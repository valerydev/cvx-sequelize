module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{

    id: {},
    contractId: {},
    classifierId1: {},
    classifierId2: {},
    classifierId3: {},
    branchId: {},
    code: {},
    type: {},
    categoryId: {},
    name: {},
    shortName : {},
    reference : {},
    brandId : {},
    model : {},
    primaryUnitId: {},
    secondaryUnitId: {},
    costMethod : {},
    status: {}

  }, {
    classMethods: {
      associate: function () {
        this.belongsTo(models.Contract,         { as: 'contract',        foreignKey: 'contrato_correlativo'         });
        this.belongsTo(models.Branch,           { as: 'branch',          foreignKey: 'sucursal_correlativo'         });
        this.belongsTo(models.BranchClassifier, { as: 'classifier1',     foreignKey: 'clasificacion_1_correlativo'  });
        this.belongsTo(models.BranchClassifier, { as: 'classifier2',     foreignKey: 'clasificacion_2_correlativo'  });
        this.belongsTo(models.BranchClassifier, { as: 'classifier3',     foreignKey: 'clasificacion_3_correlativo'  });
        this.belongsTo(models.Category,         { as: 'category',        foreignKey: 'categoria_correlativo'        });
        this.belongsTo(models.Brand,            { as: 'brand',           foreignKey: 'marca_correlativo'            });
        this.belongsTo(models.Unit,             { as: 'primaryUnit',     foreignKey: 'unidad_principal_correlativo' });
        this.belongsTo(models.Unit,             { as: 'secondaryUnit',   foreignKey: 'unidad_secundaria_correlativo'});
        this.hasMany  (models.ProductAltCode,   { as: 'altCodes',        foreignKey: 'producto_correlativo'         });
        this.hasOne   (models.ProductAttributes,{ as: 'attributes',      foreignKey: 'producto_correlativo'         });
        this.hasOne   (models.ProductColorSize, { as: 'colorSize',       foreignKey: 'producto_correlativo'         });
        this.hasOne   (models.ProductCosts,     { as: 'costs',           foreignKey: 'producto_correlativo'         });
        this.hasMany  (models.ProductDimensions,{ as: 'dimensions',      foreignKey: 'producto_correlativo'         });
        this.hasOne   (models.ProductPrices,    { as: 'prices',          foreignKey: 'producto_correlativo'         });
        this.hasOne   (models.ProductTaxes,     { as: 'taxes',           foreignKey: 'producto_correlativo'         });
        this.belongsToMany(models.Warehouse,    {
          as: 'warehouses',
          through: models.ProductWarehouse,
          foreignKey: {
            name: 'productId',
            field: 'producto_correlativo'
          },
          otherKey: {
            name: 'warehouseId',
            field: 'almacen_correlativo'
          }
        });
        this.belongsToMany(models.WarehousePlacement, {
          as: 'placements',
          through: models.ProductWarehousePlacement,
          foreignKey: {
            name: 'productId',
            field: 'producto_correlativo'
          },
          otherKey: {
            name: 'warehousePlacementId',
            field: 'ubicacion_correlativo'
          }
        });
        this.belongsToMany(models.Supplier,    {
          as: 'suppliers',
          through: models.ProductSupplier,
          foreignKey: {
            name: 'productId',
            field: 'producto_correlativo'
          },
          otherKey: {
            name: 'supplierId',
            field: 'proveedor_correlativo'
          }
        });
      }
    }
  }];
};
