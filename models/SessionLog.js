/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {

  var fn      = Sequelize.fn;
  var col     = Sequelize.col;
  var literal = Sequelize.literal;
  var models  = sequelize.models;
  var _       = Sequelize.Utils._;

  return [{
    id: {},
    userId: {},
    stationId: {},
    deviceToken: {},
    logonAt: {},
    ip: {},
    mac: {},
    logoffAt: {},
    status: {}
  }, {
    classMethods: {
      associate: function () {
        this.belongsTo( models.User,    { as: 'user',    foreignKey: 'usuario_correlativo'  });
        this.belongsTo( models.Station, { as: 'station', foreignKey: 'estacion_correlativo' });
      }
    }
  }];
};
