var fs        = require('fs');
var path      = require('path');
var cls = require('continuation-local-storage');
var Sequelize = require('sequelize');
var DataTypes = Sequelize;
//var inflection= require('inflection');
var _         = require('underscore');
var utils     = require('./utils');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'test';
var config    = require(__dirname + '/config/config.json')[env];
var modelAttribs = require('valeryweb-model-attribs')(DataTypes);
var models    = {};

Sequelize.cls = cls.createNamespace('valeryweb-model-ns');

if(!config) throw new Error('No se encontro la configuracion "' + env + '" de conexion para el modelo de valeryweb')

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(path.join(__dirname, 'models'))
.filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
})
.forEach(function(file) {
    var modelName = file.slice(0,-3);

    if (file.slice(-3) !== '.js') return;

    var modelOpts    = require(path.join(__dirname, 'models', file))( sequelize, DataTypes );

    var baseAttribs  = modelAttribs[ modelName ][0];
    var otherAttribs = modelOpts[0];
    var baseOpts     = modelOpts[1];
    var otherOpts    = modelAttribs[ modelName ][1];

    Object.keys(baseAttribs).forEach(function(attrib){
       if( otherAttribs[attrib] && otherAttribs[attrib].get ) {
         baseAttribs[attrib].get = otherAttribs[attrib].get;
       }
       if( otherAttribs[attrib] && otherAttribs[attrib].set ) {
         baseAttribs[attrib].set = otherAttribs[attrib].set;
       }
    });

    if(otherOpts) {
        if(!_.isUndefined(otherOpts.tableName)) {
            baseOpts.tableName = otherOpts.tableName;
        }
        if(!_.isUndefined(otherOpts.validate)) {
            baseOpts.validate  = _.defaults(baseOpts.validate, otherOpts.validate);
        }
    }

    var model = sequelize['import'](modelName, function(){
       return sequelize.define(modelName, baseAttribs, baseOpts);
    });

    models[model.name] = model;
});

utils.addJSONSchema( _.values( models ) );
utils.wrapAssociations( _.values( models ) );

//Ejecutamos las asociaciones
_.values( models ).forEach(function( model ) {
    if (model.associate) {
        model.associate();
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;


//sequelize.sync({
//    force: true,
//    match: /^test|test$/i,
//    logging: console.log.bind(console)
//}).then(function(){
//    var newSupplier = {
//        contractId: 1,
//        classifierId1: 1,
//        classifierId2: 2,
//        classifierId3: 3,
//        branchId: 27,
//        Contacts: [{
//            contractId: 1,
//            entity: 'PRV'
//        }],
//        Addresses: [{
//            contractId: 1,
//            entity: 'PRV'
//        }],
//        code: 'AAAAAAA',
//        name: 'Proveedor A',
//        fiscalDenomination: 'SA',
//        fiscalId1  : 'ABCDEFGHIJ0123456789',
//        fiscalId2  : 'ABCDEFGHIJ9876543210',
//        creditDays : 7,
//        creditLimit: 500000,
//        defaultCurrencyId: 62,
//        //language: {
//        //    name: 'spanish',
//        //    translatedName: 'español',
//        //    code: 'ESP'
//        //}
//    };
//
//    models.Supplier.create(newSupplier,{
//        include: [ models.Contact, models.Address ]
//    }).then(function(){
//        return models.Supplier.findById(1, {include:[models.Contact, models.Address]});
//    }).then(function(supplier){
//        console.log(JSON.stringify(supplier));
//    });
//});

