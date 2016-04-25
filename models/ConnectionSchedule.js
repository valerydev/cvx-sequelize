/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {
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
              required: true
            }
          ]
        }
      }
    }
  }];
};