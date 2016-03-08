/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {
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
    }
  }];
};
