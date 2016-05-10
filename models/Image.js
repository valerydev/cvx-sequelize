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
    type: {},
    image: {
      get: function(){
        var image = this.getDataValue('image');
        return (image||{toString:()=>{return null}}).toString('base64');
      },
      set: function(val) {
        //Para tipos BLOB si se recibe una cadena base64 se transforma en el
        //formato literal de hexadecimal que acepta la BD.
        this.setDataValue('image', val);
      }
    }
  },{
    classMethods: {
      associate: function () {}
    }
  }];
};
