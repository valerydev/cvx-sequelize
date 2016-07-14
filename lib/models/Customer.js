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
    kind: {},
    fullName: {},
    name: {},
    middleName: {},
    surname: {},
    secondSurname: {},
    fiscalId1: {},
    fiscalId2: {},
    groupId: {},
    sellerId: {},
    priceListId: {},
    discountPercentage1: {},
    discountPercentage2: {},
    originId: {},
    sessionId: {}
  }, {
    classMethods: {
      associate: function () {
        this.belongsTo(models.CustomerGroup, { as: 'group',     foreignKey: 'grupo_clientes_correlativo' });
        this.hasMany  (models.Address,       { as: 'addresses', foreignKey: 'entidad_correlativo', scope: { entity: 'CLI' }, constraints: false });
        this.hasMany  (models.Contact,       { as: 'contacts',  foreignKey: 'entidad_correlativo', scope: { entity: 'CLI' }, constraints: false });
      }
    },
    defaultScope: function() {
      return {
        include: _.concat(
          this.scopes.includeAddresses().include,
          this.scopes.includeContacts().include
        )
      }
    },
    scopes: {
      shortInfo: function() {
        return {
          attributes: ['id', 'code', 'kind', 'fullName', 'name', 'middleName', 'surname', 'secondSurname']
        }
      },
      includeGroup: function(where) {
        return {
          include: [
            {
              as: 'group',
              model: models.Contact,
              required: false,
              where: where||{}
            }
          ]
        }
      },
      includeContacts: function(where) {
        return {
          include: [
            {
              as: 'contacts',
              model: models.Contact,
              required: false,
              where: where||{}
            }
          ]
        }
      },
      includeAddresses: function(where){
        return {
          include: [
            {
              as: 'addresses',
              model: models.Address,
              required: false,
              where: where||{}
            }
          ]
        }
      }
    }
  }];
};
