"use strict"
var fs             = require('fs');
var path           = require('path');
var Sequelize      = require('sequelize');
var cls            = require('continuation-local-storage');
var installPlugins = require('./lib/sequelize-plugins');
var _              = Sequelize.Utils._;

Sequelize.cls = cls.createNamespace('valeryweb-model-ns');

module.exports = function(config) {

  if (!config) {
    config = {
      "user": null,
      "password": null,
      "database": "model-test",
      "dialect": "sqlite",
      "define":
      {
        "timestamps": false,
        "freezeTableName": true,
        "underscored": true
      }
    }
  }

  var sequelize = new Sequelize(config.database, config.user, config.password, config);
  installPlugins(sequelize);

  sequelize.import(path.join(__dirname, 'lib/models'), {
    splitted: true,
    attribs:  path.join(__dirname, 'lib/attribs')
  });

  var models = sequelize.models;
  models.sequelize = sequelize;
  models.Sequelize = Sequelize;

  models.sync = function(options){
      options = options || {};
      if(!options.force ) options.force = true;
      if(!options.match ) options.match = /^test|test$/i;
      if(_.isUndefined(options.logging))
          options.logging = false;
      else if(options.logging === true ){
          options.logging = console.log.bind(console);
      }
      return sequelize.sync(options);
  };

  return models;
};

module.exports.initialize = function(config, attribName){
    var models = module.exports(config);

    return (function(models, attribName) {
        if(!attribName) attribName = 'models';
        var middleware = function(req, res, next) {
            if(req) req[attribName] = models;
            if(_.isFunction(next)) next();
            return models;
        };
        middleware.models = models;
        return middleware;
    })(models, attribName)
};

module.exports();