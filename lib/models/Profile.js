/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {

  var fn  = Sequelize.fn;
  var col = Sequelize.col;
  var literal = Sequelize.literal;
  var models = sequelize.models;
  var _ = Sequelize.Utils._;

  return [{
    id: {},
    contractId: {},
    branchId: {},
    code: {},
    name: {
      get: function(){
        return this.getDataValue('name') || '';
      }
    },
    active: {},
    disabledMenus: {}
  },{
    classMethods: {
      associate: function () {
        this.belongsTo( models.Contract, { as: 'contract', foreignKey: 'contrato_correlativo' });
        this.hasMany  ( models.User,     { as: 'users',    foreignKey: 'perfil_correlativo'   });
        this.belongsToMany( sequelize.models.Property, {
          through: sequelize.models.ProfileProperty,
          as: 'properties',
          foreignKey: {
            name: 'profileId',
            field: 'perfil_correlativo'
          },
          otherKey: {
            name: 'propertyId',
            field: 'propiedad_correlativo'
          }
        });
      }
    },

    getterMethods: {
      cascadeProperties: function() {
        return _.unionBy(this.properties, (this.contract||{}).properties, 'code');
      }
    },

    scopes: {

      selectNameNotNull: {
        attributes: {
          include: ['code',
            [fn('COALESCE', col('profile.correlativo'), 0), 'id'],
            [fn('COALESCE', col('profile.nombre'), ''), 'name']
          ]
        }
      },

      includeProperties: function (where) {
        return {
          include: [
            {
              model: models.Property.scope('includeCategory'),
              as: 'properties',
              required: false,
              where: where||{}
            }
          ]
        }
      },

      includeAllProperties: function(where) {
        return {
          include: [
            {
              model: models.Property.scope('includeCategory'),
              as: 'properties',
              required: false,
              where: where||{}
            },
            {
              model: models.Contract.scope({ method: ['includeProperties', where] }),
              as: 'contract',
              require: true
            }
          ]
        }
      }
    }
  }];
};
