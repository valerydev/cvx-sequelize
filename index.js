var fs        = require('fs');
var path      = require('path');
var cls       = require('continuation-local-storage');
var Sequelize = require('sequelize');
var _         = require('underscore');
var utils     = require('./utils');
var modelAttribs = require('valeryweb-model-attribs')(Sequelize, Sequelize);

var basename  = path.basename(module.filename);
Sequelize.cls = cls.createNamespace('valeryweb-model-ns');
var DataTypes = Sequelize;

module.exports = function(config) {

    if (!config) throw new Error('No especifico una configuracion para el modelo');

    var models    = {};
    var sequelize = new Sequelize(config.database, config.user, config.password, config);

    fs.readdirSync(path.join(__dirname, 'models'))
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename);
    })
    .forEach(function (file) {
        var modelName = file.slice(0, -3);

        if (file.slice(-3) !== '.js') return;

        var modelOpts = require(path.join(__dirname, 'models', file))(sequelize, DataTypes);

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