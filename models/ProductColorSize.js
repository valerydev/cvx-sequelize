module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    productId: {},
    sizeId: {},
    colorId: {},
    originId: {},
    sessionId: {}
  }, {
    classMethods: {
      associate: function () {
        this.belongsTo(models.ProductSize,  { as: 'size',   foreignKey: 'talla_correlativo'    });
        this.belongsTo(models.ProductColor, { as: 'color',  foreignKey: 'color_correlativo'    });
      }
    },
    defaultScope: function(){
      return {
        include: [
          { as: 'size',  model: models.ProductSize,  attributes: ['name','code'] },
          { as: 'color', model: models.ProductColor, attributes: ['name','code'] }
        ]
      }
    }
  }];
};
