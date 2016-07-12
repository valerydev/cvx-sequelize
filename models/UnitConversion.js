/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var where   = Sequelize.where;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    unitId1: {},
    unitId2: {},
    factor: {},
    type: {},
    value: {},
    originId: {},
    sessionId: {}
  },{
    classMethods: {
      associate: function () {
        this.belongsTo(models.Unit, { as: 'unit1', foreignKey: 'correlativo_unidad_1' });
        this.belongsTo(models.Unit, { as: 'unit2', foreignKey: 'correlativo_unidad_2' });
      },
      calculateFactor: function(conv) {
        if(conv.type === '1') {
          if( conv.value == 0 ){
            conv.factor = 1;
          } else{
            conv.factor = 1 / conv.value;
          }
        } else {
          conv.factor = conv.value;
        }
      }
    },
    hooks: {
      beforeCreate: function(conv, opts){
        if(conv.value !== undefined)
          this.calculateFactor(conv);
      },
      beforeUpdate: function(conv, opts){
        if(conv.value !== undefined)
          this.calculateFactor(conv);
      }
    },
    defaultScope: function() {
      return this.scopes.includeUnits();
    },
    scopes: {
      includeUnits: function(){
        return {
          include: [
            { as: 'unit1', model: models.Unit.scope('shortInfo') },
            { as: 'unit2', model: models.Unit.scope('shortInfo') }
          ]
        }
      }
    }
  }];
};
