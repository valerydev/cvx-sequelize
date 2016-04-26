/* jshint indent: 2 */
module.exports = function(sequelize, Sequelize) {

  var fn  = Sequelize.fn;
  var col = Sequelize.col;
  var literal = Sequelize.literal;
  var models = sequelize.models;

  return [{
    id: {},
    criteriaId: {},
    countryId: {},
    currencyId: {},
    amount: {},
    points: {}
  },{
    classMethods: {
      associate: function () {
      }
    }
  }];
};
