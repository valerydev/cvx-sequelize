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
    module: {},
    type: {},
    image: {
      get: function(){
        var image = this.getDataValue('image');
        return (image||{toString:()=>{return null}}).toString('base64');
      },
      set: function(val) {
        if(typeof val == 'string') {
          this.setDataValue('image', new Buffer(val, 'base64'));
        } else {
          this.setDataValue('image', val);
        }
      }
    }
  },{
    classMethods: {
      associate: function () {}
    }
  }];
};
