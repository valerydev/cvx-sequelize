var Promise = require('bluebird');
var _ = require('underscore');
var s = require('underscore.string');

module.exports = function(sequelize, Sequelize) {
  return [{
    id: {},
    contractId: {},
    sequence: {}
  }, {
    scopes: {
      nextCode: function(contractId){
        return {
          where: { contractId: contractId }
        }
      }
    },

    classMethods: {
      associate: function () {},

      //Finder methods
      getNextCode: function(contractId, options) {
        var self = this;
        options = _.defaults(options||{}, {
          start: 1,
          step: 1
        });

        return self.scope({method: ['nextCode', contractId]}).findOrCreate({
          defaults: {
            contractId: contractId,
            sequence: options.start
          },
          where: {}
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
