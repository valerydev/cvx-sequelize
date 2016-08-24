module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    productId: {},
    imageId1: {},
    imageId2: {},
    imageId3: {},
    imageId4: {},
    imageId5: {},
    imageId6: {},
    editableDescription: {},
    forSale: {},
    buyable: {},
    composite: {},
    consignment: {},
    internal: {},
    fractioned: {},
    hasSerial: {},
    size: {},
    color: {},
    composedCodingMethod: {},
    franchiseProfitPercentage: {},
    imported: {},
    warrantyDays: {},
    passwordProtectedSale: {},
    originId: {},
    sessionId: {}
  }, {
    transactionLog: true,
    classMethods: {
      associate: function () {
        this.belongsTo(models.Product, { as: 'product',  foreignKey: 'producto_correlativo' });
        this.belongsTo(models.Image,   { as: 'image1',   foreignKey: 'imagen_1'             });
        this.belongsTo(models.Image,   { as: 'image2',   foreignKey: 'imagen_2'             });
        this.belongsTo(models.Image,   { as: 'image3',   foreignKey: 'imagen_3'             });
        this.belongsTo(models.Image,   { as: 'image4',   foreignKey: 'imagen_4'             });
        this.belongsTo(models.Image,   { as: 'image5',   foreignKey: 'imagen_5'             });
        this.belongsTo(models.Image,   { as: 'image6',   foreignKey: 'imagen_6'             });
      }
    },
    scopes: {
      includeImages: function(){
        return {
          include: [
            { as: 'image1', model: models.Image },
            { as: 'image2', model: models.Image },
            { as: 'image3', model: models.Image },
            { as: 'image4', model: models.Image },
            { as: 'image5', model: models.Image },
            { as: 'image6', model: models.Image },
          ]
        }
      }
    }
  }];
};
