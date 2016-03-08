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
        this.hasMany(sequelize.models.ConnectionScheduleDetail, { foreignKey: 'horario_correlativo', as: 'details' });
      }
    }
  }];
};
