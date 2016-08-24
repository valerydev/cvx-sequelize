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
    fiscalId1: {},
    fiscalId2: {},
    notes: {},
    photoId: {},
    originId: {},
    sessionId: {}
  }, {
    classMethods: {
      associate: function () {
        this.belongsTo(models.Image,    { as: 'photo',    foreignKey: 'imagen_1' });
      }
    },
    defaultScope: function() {
      return _.assign(
        this.scopes.shortInfo(),
        this.scopes.includePhoto()
      );
    },
    scopes: {
      shortInfo: function() {
        return {
          attributes: ['id', 'code','name']
        }
      },
      includePhoto: function(){
        return {
          include: [{ as: 'photo', model: models.Image }]
        }
      }
    }
  }];
};
