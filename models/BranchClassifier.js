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
    level: {},
    name: {
      get: function(){
        return this.getDataValue('name') || '';
      }
    },
    parentId: {}
  },{
    classMethods: {
      associate: function () {

      }
    },

    scopes: {
      selectNameNotNull: function(level) {
        return {
          attributes: {
            include: [
              [fn('COALESCE', col('classifier'+level+'.correlativo'), 0), 'id'],
              [fn('COALESCE', col('classifier'+level+'.nombre'),     ''), 'name']
            ]
          },
          where: {level: level}
        }
      }
    }
  }];
};
