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
    sysCurrencyId: {},
    customExchange: {},
    primary: {},
    active: {}
  }, {
    classMethods: {
      associate: function () {
        this.belongsTo( models.Contract,         { as: 'contract'      , foreignKey: 'contrato_correlativo'        });
        this.belongsTo( models.Branch,           { as: 'branch'        , foreignKey: 'sucursal_correlativo'        });
        this.belongsTo( models.BranchClassifier, { as: 'classifier1'   , foreignKey: 'clasificacion_1_correlativo' });
        this.belongsTo( models.BranchClassifier, { as: 'classifier2'   , foreignKey: 'clasificacion_2_correlativo' });
        this.belongsTo( models.BranchClassifier, { as: 'classifier3'   , foreignKey: 'clasificacion_3_correlativo' });
        this.hasMany  ( models.CurrencyExchange, { as: 'exchanges'     , foreignKey: 'correlativo_moneda_1'        });
        this.belongsTo( models.SysCurrency,      { as: 'sysCurrency'   , foreignKey: 'sys_moneda_correlativo'      });
      }
    },

    defaultScope: function() {
      return {
        include: _.concat(
          this.scopes.includeExchanges().include,
          this.scopes.includeSysCurrency().include
        )
      }
    },
    scopes: {
      includeExchanges: function(where) {
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
      includeSysCurrency: function() {
        return {
          include: [
            {
              as: 'sysCurrency',
              model: models.SysCurrency,
              required: false
            }
          ]
        }
      },
      shortInfo: function() {
        return {
          attributes: ['id', 'sysCurrencyId', 'customExchange', 'primary', 'active']
        }
      }
    }

  }]
};
