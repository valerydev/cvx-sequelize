/* jshint indent: 2 */
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
    name: {},
    notes: {},
    originId: {},
    sessionId: {}
  }, {
    classMethods: {
      associate: function () {
        this.hasMany(models.Client, { as: 'clients', foreignKey: 'grupo_clientes_correlativo' });
      }
    },
    scopes: {
      includeClients: function(where) {
        return {
          include: [
            {
              as: 'exchanges',
              model: models.CurrencyExchange,
              required: false,
              where: where||{}
            }
          ]
        }
      },
      shortInfo: function() {
        return {
          attributes: ['id', 'code', 'name']
        }
      }
    }
  }];
};
