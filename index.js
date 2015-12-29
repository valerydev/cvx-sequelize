var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var _         = require('underscore');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'test';
var config    = require(__dirname + '/config/config.json')[env];
var db  = {};

var DataTypes = {
    BIGINT: function(){
        return 'integer';
    },
    INTEGER: function(){
        return 'integer';
    },
    FLOAT: function(){
        return 'number';
    },
    DECIMAL: function(){
        return 'number';
    },
    DOUBLE: function(){
        return 'number';
    },
    BOOLEAN: function(){
        return 'boolean';
    },
    TEXT: function(){
        return 'string';
    },
    ENUM: function(){
        var args = Array.prototype.slice.call(arguments);
        return 'string' + '['+ args.join(',') +']';
    },
    DATE: function(){
        return 'string' + '#date';
    },
    BINARY: function(){
        return 'binary';
    },
    STRING: function(len){
        return 'string'+ (len ? '('+len+')' : '');
    }
};

var modelAttribs = require('valeryweb-model-attribs')(DataTypes);

var sequelizeToJSONSchema = function (modelName, modelDef) {

    // Expresiones regulares utilizadas en las validaciones
    var urlRegEx = "^(https?:\\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\/\\w \\.-]*)*\/?$";
    var IPv4RegEx = "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";
    var IPv6RegEx = "^\\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))(%.+)?\\s*$";
    var emailRegEx = "^\\S+@\\S+$";
    var lowercaseRegEx = "[^A-Z]*$";
    var uppercaseRegEx = "[^a-z]*$";
    var alphaRegEx = "^[a-zA-Z\\s]*$";
    var numericRegEx = "^[-+]?[0-9]+$";
    var floatRegEx = "^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$";
    var decimalRegEx = "^[-+]?([0-9]+|\.[0-9]+|[0-9]+\.[0-9]+)$";
    var intRegEx = "^(?:[-+]?(?:0|[1-9][0-9]*))$";
    var alphanumericRegEx = "^[a-zA-Z0-9\\s]*$";
    var creditCardRegEx = "^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$";

    //
    var keys = Object.keys( modelDef );
    var required = [];
    var properties = {};
    keys.forEach( function( key ) {

        if( !modelDef[key].title ) return;

        properties[key] = {
            title: modelDef[key].title,
            type: typeof modelDef[key].type == 'function' ? modelDef[key].type() : modelDef[key].type
        };

        var matchResult = properties[key].type.match( /\((\d+)\)/ );
        if( matchResult != null ) {
            properties[key].type = properties[key].type.replace( /\((\d+)\)/, '' );
            properties[key].maxLength = parseInt( matchResult[1] );
        }

        var matchResult = properties[key].type.match( /\[(.+?)\]/ );
        if( matchResult != null ) {
            properties[key].type = properties[key].type.replace( /\[(.+?)\]/, '' );
            properties[key].enum = matchResult[1].split( "," );
        }

        var matchResult = properties[key].type.match( /#(.+)/ );
        if( matchResult != null ) {
            properties[key].type = properties[key].type.replace( /#(.+)/, '' );
            properties[key].format = matchResult[1] ;
        }

        if( modelDef[key].description )
            properties[key].description = modelDef[key].description;

        if( modelDef[key].defaultValue )
            properties[key].default = modelDef[key].defaultValue;

        if( modelDef[key].allowNull === false )
            required.push( key );

        if( modelDef[key].validate ) {
            var validate = modelDef[key].validate;

            if( typeof modelDef[key].allowNull == 'undefined' && validate.notNull ) {
                required.push( key );
            }

            if( typeof modelDef[key].allowNull == 'undefined' && validate.isNull === false ) {
                required.push( key );
            }

            if( validate.notEmpty ) {
                properties[key].minLength = 1;
            }

            if( validate.len ) {
                if( validate.len instanceof Array ){
                    properties[key].minLength = parseInt( validate.len[0] );
                    if( validate.len.length > 1 ){
                        properties[key].maxLength = parseInt( validate.len[1] );
                    }
                } else {
                    properties[key].minLength = parseInt( validate.len );
                }
            }

            if( validate.isIn ) {
                properties[key].enum = validate.isIn[0];
            }

            if( validate.notIn ) {
                properties[key].not = { "enum" : validate.notIn[0] };
            }

            if( validate.isUrl ) {
                properties[key].pattern = urlRegEx;
            }

            if( validate.isIP ) {
                properties[key].anyOf  = [
                    { "pattern" : IPv4RegEx },
                    { "pattern" : IPv6RegEx }
                ]
            }

            if( validate.isIPv4 ) {
                properties[key].pattern = IPv4RegEx;
            }

            if( validate.isIPv6 ) {
                properties[key].pattern = IPv6RegEx;
            }

            if( validate.isEmail ) {
                properties[key].pattern = emailRegEx;
            }

            if( validate.max ) {
                properties[key].maximum = parseInt( validate.max );
            }

            if( validate.min ) {
                properties[key].minimum = parseInt( validate.min );
            }

            if( validate.is ) {
                if( validate.is instanceof RegExp ) {
                    properties[key].pattern = validate.is.toString().slice( 1,-1 );
                } else if( validate.is instanceof Array ){
                    properties[key].pattern = validate.is[0];
                } else {
                    properties[key].pattern = validate.is
                }
            }

            if( validate.isLowercase ) {
                properties[key].pattern = lowercaseRegEx;
            }

            if( validate.equals ) {
                properties[key].pattern = "^" + validate.equals + "$";
            }
            // TODO :

            if( validate.isUppercase ) {
                properties[key].pattern = uppercaseRegEx;
            }

            if( validate.isDate ) {
                properties[key].format = "date"
            }

            if( validate.isAlpha ) {
                properties[key].pattern = alphaRegEx;
            }

            if( validate.notContains ) {
                properties[key].not = { "pattern":  validate.notContains };
            }

            if( validate.contains ) {
                properties[key].pattern = validate.contains;
            }

            if( validate.isNumeric ) {
                properties[key].pattern = numericRegEx;
            }

            if( validate.isFloat ) {
                properties[key].pattern = floatRegEx;
            }

            if( validate.isDecimal ) {
                properties[key].pattern = decimalRegEx;
            }

            if( validate.isInt ) {
                properties[key].pattern = intRegEx;
            }

            if( validate.isAlphanumeric ) {
                properties[key].pattern = alphanumericRegEx;
            }

            if( validate.isCreditCard ) {
                properties[key].pattern = creditCardRegEx;
            }

            if( validate.not ) {
                if( validate.not instanceof RegExp ) {
                    properties[key].not = {
                        pattern : validate.not.toString().slice( 1,-1 )
                    }
                } else if( validate.not instanceof Array ){
                    properties[key].not = {
                        pattern : validate.not[0]
                    }
                } else {
                    properties[key].not = {
                        pattern : validate.not
                    }
                }
            }
        }

    });

    return {
        type: "object",
        title: modelName,
        properties: properties,
        required : required
    };
};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(path.join(__dirname, 'lib'))
.filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
})
.forEach(function(file) {
    var modelName = file.slice(0,-3);

    if (file.slice(-3) !== '.js') return;

    var modelOpts = require(path.join(__dirname, 'lib', file))(sequelize, Sequelize);
    var baseAttribs = _.clone( modelAttribs[ modelName ][0] );
    var otherAttribs = modelOpts[0];

    var baseOpts  = modelOpts[1];
    var otherOpts  = _.clone( modelAttribs[ modelName ][1] );

    Object.keys(baseAttribs).forEach(function(attrib){
       if( otherAttribs[attrib] && otherAttribs[attrib].get ) {
         baseAttribs[attrib].get = otherAttribs[attrib].get;
       }
       if( otherAttribs[attrib] && otherAttribs[attrib].set ) {
         baseAttribs[attrib].set = otherAttribs[attrib].set;
       }
    });

    if(otherOpts) {
      baseOpts.validate = otherOpts;
    }

    var model = sequelize['import'](modelName, function(){
       return sequelize.define(modelName, baseAttribs, baseOpts);
    });

    model.getJSONSchema = sequelizeToJSONSchema(modelName, modelAttribs[ modelName ][0]);
    db[model.name] = model;

});

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

