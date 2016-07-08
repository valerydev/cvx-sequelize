module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    productId: {},
    unitId: {},
    height: {},
    width: {},
    length: {},
    weight: {},
    metricUnitId: {},
    volume: {}
  }, {
    classMethods: {
      associate: function () {
        this.belongsTo(models.Product, { as: 'product',    foreignKey: 'producto_correlativo'       });
        this.belongsTo(models.Unit,    { as: 'unit',       foreignKey: 'unidad_correlativo'         });
        this.belongsTo(models.Unit,    { as: 'metricUnit', foreignKey: 'unidad_metrica_correlativo' });
      }
    },
    defaultScope: function(){
      return {
        include: _.concat(this.scopes.includeUnits().include, this.scopes.includeMetricUnit().include)
      }
    },
    scopes: {
      includeUnits: function() {
        return {
          include: [{ as: 'unit', model: models.Unit.scope('shortInfo'), required: false }]
        }
      },
      includeMetricUnit: function() {
        return {
          include: [{ as: 'metricUnit', model: models.Unit.scope('shortInfo'), required: false }]
        }
      }
    }
  }];
};
