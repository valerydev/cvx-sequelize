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
    name: {},
    indicator: {}
  }, {
    classMethods: {
      associate: function () {
        this.hasMany(sequelize.models.ConnectionScheduleDetail, { as: 'details', foreignKey: 'horario_correlativo' });
      }
    },
    scopes: {
      includeDetails: function() {
        return {
          include: [
            {
              model: sequelize.models.ConnectionScheduleDetail,
              as: "details",
              required: false
            }
          ]
        }
      }
    }
  }];
};
