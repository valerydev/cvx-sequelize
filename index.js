var fs           = require('fs');
var path         = require('path');
var cls          = require('continuation-local-storage');
var ssaclRoles   = require('./sequelize-plugins/ssacl-attribute-roles');
var assocFields  = require('./sequelize-plugins/sequelize-association-fields');
var assocUpdate  = require('./sequelize-plugins/sequelize-association-updates');
var cValidators  = require('./sequelize-plugins/sequelize-custom-validations');
var serialSchema = require('./sequelize-plugins/sequelize-serializable-schema');
var globalHooks  = require('./sequelize-plugins/sequelize-global-hooks');
var Sequelize    = require('sequelize');
var _            = require('underscore');
var utils        = require('./utils');

var basename  = path.basename(module.filename);
Sequelize.cls = cls.createNamespace('valeryweb-model-ns');
var DataTypes = Sequelize;

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

  var models    = {};
  var sequelize = new Sequelize(config.database, config.user, config.password, config);

  serialSchema(sequelize);
  assocFields(sequelize);
  ssaclRoles(sequelize);
  assocUpdate(sequelize);
  cValidators(sequelize);
  globalHooks(sequelize);

  var modelAttribs = require('./models/attribs')(DataTypes, Sequelize);

    fs.readdirSync(path.join(__dirname, 'models'))
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename);
    })
    .forEach(function (file) {
        var modelName = file.slice(0, -3);

        if (file.slice(-3) !== '.js') return;

        var modelOpts = require(path.join(__dirname, 'models', file))(sequelize, DataTypes);

        if(! modelAttribs[modelName] )
          throw new Error('No se encuentra la definicion de atributos del modelo ' + modelName);

        var baseAttribs = modelAttribs[modelName][0];
        var otherAttribs = modelOpts[0];
        var baseOpts = modelOpts[1];
        var otherOpts = modelAttribs[modelName][1];

        Object.keys(baseAttribs).forEach(function (attrib) {
            if (otherAttribs[attrib] && otherAttribs[attrib].get) {
                baseAttribs[attrib].get = otherAttribs[attrib].get;
            }
            if (otherAttribs[attrib] && otherAttribs[attrib].set) {
                baseAttribs[attrib].set = otherAttribs[attrib].set;
            }
        });

        if (otherOpts) {
            if (!_.isUndefined(otherOpts.tableName)) {
                baseOpts.tableName = otherOpts.tableName;
            }
            if (!_.isUndefined(otherOpts.validate)) {
                baseOpts.validate = _.defaults(baseOpts.validate, otherOpts.validate);
            }
        }

        var model = sequelize['import'](modelName, function () {
            return sequelize.define(modelName, baseAttribs, baseOpts);
        });

        models[model.name] = model;
    });

    models.sequelize = sequelize;
    models.Sequelize = Sequelize;

    utils.addJSONSchema(models);
    utils.wrapAssociations(models);

    //Convertidor base64/Buffer para tipos BLOB
    //Sequelize.BLOB.parse = function(value, options) {
    //  if (Buffer.isBuffer(value)) {
    //    return value.toString('base64');
    //  } else if( typeof value.buffer == 'function' ) {
    //    return (value.parser._buffer || {toString: ()=>{}}).toString('base64');
    //  }
    //};
    Sequelize.BLOB.prototype.stringify = function(value, options) {
      if (!Buffer.isBuffer(value)) {
        if (Array.isArray(value)) {
          value = new Buffer(value);
        } else if(Sequelize.Validator.isBase64(value)){
          value = new Buffer(value.toString(), 'base64');
        } else if(Sequelize.Validator.isHexadecimal(value)) {
          value = new Buffer(value.toString(), 'hex');
        } else {
          value = new Buffer(value.toString());
        }
      }
      var hex = value.toString('hex');
      return "X'" + hex + "'";
    };
    sequelize.refreshTypes();

    //Ejecutamos las asociaciones
    _.values(models).forEach(function (model) {
        if (model.associate) {
            model.associate();
        }
    });

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

    return (function(models,attribName) {
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