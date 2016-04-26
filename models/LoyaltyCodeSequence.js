var Promise = require('bluebird');
var _ = require('underscore');
var s = require('underscore.string');

module.exports = function(sequelize, Sequelize) {

  var fn  = Sequelize.fn;
  var col = Sequelize.col;
  var literal = Sequelize.literal;
  var models = sequelize.models;

  return [{
    id: {},
    contractId: {},
    sequence: {}
  }, {

    classMethods: {
      associate: function () {},

      //Finder methods
      getNextCode: function(contractId, options) {
        var self = this;
        options = _.defaults(options||{}, {
          start: 1,
          step: 1
        });

        return self.findOrCreate({
          defaults: {
            contractId: contractId,
            sequence: options.start
          },
          where: { contractId: contractId }
        }).spread(function (seq, created) {
          if(created) {
            return seq.sequence;
          } else {
            return seq.increment('sequence', {by: options.step}).then(function(seq){
              return seq.reload().then(function(seq){
                return s.lpad(seq.sequence, '6', '0');
              });
            })
          }
        });
      }
    }
  }];
};
