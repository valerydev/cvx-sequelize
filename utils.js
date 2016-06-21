var _ = require('underscore');
var validator = require('validator');

module.exports.wrapAssociations = function(models){

    var Model = models.Sequelize.Model;

    models = _.flatten([_.filter(_.values(models), function(model){
      return model instanceof Model
    })]);

    models.forEach(function(model){
        model.hasOne._assocType        = 'hasOne';
        model.hasMany._assocType       = 'hasMany';
        model.belongsTo._assocType     = 'belongsTo';
        model.belongsToMany._assocType = 'belongsToMany';

        var associationWrapper = function(assocFunc, target, opts){

            var foreignKeyAttrib = null;

            //Segun el tipo de relacion escojemos cual modelo representa la tabla
            //propietaria de la relacion (owner) y cual modelo representa la tabla
            //inversa de la relacion (inverse).
            var owner, inverse;
            if(assocFunc._assocType.slice(0,3) == 'has') {
                //En asociaciones "has" el propietario de la relacion es el modelo "target"
                owner = target;
                inverse = this;
            } else if( assocFunc._assocType == 'belongsTo' ) {
                //En asociaciones "belongs" el propietario de la relacion
                //es el modelo es "this"
                owner = this;
                inverse = target;
            }

            if(opts.foreignKey) {

                if(_.isString(opts.foreignKey)) {
                    opts.foreignKey = { field: opts.foreignKey }
                }

                //TODO: Buscar el nombre de la clave foranea creada por defecto por sequelize en caso de no conseguir el nombre.
                //if(_.isUndefined(opts.foreignKey.name)){
                //    this.name + this.primaryKeyAttribute
                //}

                //Buscamos el atributo que define la clave foranea.
                foreignKeyAttrib = _.findWhere(owner.attributes, {field: opts.foreignKey.field});

                //Validamos que el atributo references (si se definió) se corresponda con la
                //definicion en la asociacion
                if(foreignKeyAttrib) {

                    if( !foreignKeyAttrib.references ){

                        //console.log('Asociacion virtual detectada: No especificó referencia en definicion del atributo "' +
                        //    foreignKeyAttrib.fieldName + '"' + ' del modelo "' + owner.name +
                        //    '" que es clave foranea al modelo "' + this.name + '".');

                    } else {

                        if(_.isString(foreignKeyAttrib.references)) {
                            //Note que por defecto sequelize asume que key es id.
                            foreignKeyAttrib.references = {model: foreignKeyAttrib.references, key: 'id'}
                        }

                        if ( foreignKeyAttrib.references.model != inverse.tableName ) {

                            throw new Error('El nombre de tabla ('+ inverse.tableName +') del modelo "' + inverse.name
                                + '" en la asociacion: ' + this.name + ' ' + assocFunc._assocType + ' ' + target.name + ', '
                                + 'no se corresponde con el nombre definido en el atributo "' + foreignKeyAttrib.fieldName
                                + '" de ' + foreignKeyAttrib.Model.name + ' (' + foreignKeyAttrib.references.model + ')');
                        }

                        if( !_.isUndefined(foreignKeyAttrib.references.key) &&
                            foreignKeyAttrib.references.key != inverse.primaryKeyField ){

                            throw new Error('El nombre de clave primaria ('+ inverse.primaryKeyField +') del modelo "'
                                + inverse.name + '" en la asociacion: ' + this.name + ' ' + assocFunc._assocType + ' '
                                + target.name + ', ' + 'no se corresponde con el nombre definido en el atributo "'
                                + foreignKeyAttrib.fieldName + '" de ' + foreignKeyAttrib.Model.name + ' ('
                                + foreignKeyAttrib.references.key + ')');
                        }
                    }
                }

                //Damos precedencia a las configuraciones establecidas en los atributos
                //sobre las establecidas en las asociaciones
                if(foreignKeyAttrib) {

                    opts.foreignKey.name = foreignKeyAttrib.fieldName;

                    if(!_.isUndefined(foreignKeyAttrib.allowNull)) {
                        opts.foreignKey.allowNull    = foreignKeyAttrib.allowNull;
                    }
                    if(!_.isUndefined(foreignKeyAttrib.defaultValue)) {
                        opts.foreignKey.defaultValue = foreignKeyAttrib.defaultValue;
                    }
                    if(!_.isUndefined(foreignKeyAttrib.unique)) {
                        opts.foreignKey.unique = foreignKeyAttrib.unique;
                    }
                    if(!_.isUndefined(foreignKeyAttrib.type)) {
                        opts.foreignKey.type = foreignKeyAttrib.type;
                    }
                    if(!_.isUndefined(foreignKeyAttrib.comment)) {
                        opts.foreignKey.comment = foreignKeyAttrib.comment;
                    }

                    //En este caso invertimos el comportamiento por defecto de sequelize de
                    //dar precedencia a los valores de onUpdate y onDelete establecidos en
                    //las asociaciones sobre los establecidos en los atributos que definen
                    //claves foraneas.
                    if(!_.isUndefined(foreignKeyAttrib.onUpdate) && opts.constraints !== false) {
                        opts.onUpdate = foreignKeyAttrib.onUpdate;
                    }
                    if(!_.isUndefined(foreignKeyAttrib.onDelete) && opts.constraints !== false) {
                        opts.onDelete = foreignKeyAttrib.onDelete;
                    }

                }
            }

            if(opts.scope) {
                opts.scope = _.object(_.pairs(opts.scope).map(function(fieldName){
                    var attrib = _.find(owner.attributes, {fieldName: fieldName[0]});
                    fieldName[0] = attrib ? attrib.field : fieldName[0];
                    return fieldName
                }));
            }

            assocFunc.call(this, target, opts);
        };

        model.hasOne    = _.wrap(model.hasOne, associationWrapper);
        model.hasMany   = _.wrap(model.hasMany, associationWrapper);
        model.belongsTo = _.wrap(model.belongsTo, associationWrapper);
    });

};

module.exports.addJSONSchema = function (models) {

    var Sequelize = models.Sequelize;
    models = _.flatten([_.filter(_.values(models), function(model){
      return model instanceof Sequelize.Model
    })]);

    var modelAttribs = require('./models/attribs')({
        NUMBER: function(){
          return 'number';
        },
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
        NUMERIC: function(){
          return 'number';
        },
        DOUBLE: function(){
            return 'number';
        },
        REAL: function(){
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
            return 'string' + '#date-time';
        },
        DATEONLY: function(){
          return 'string' + '#date';
        },
        TIME: function(){
          return 'string' + '#time';
        },
        NOW: function(){
          return 'string' + '#date-time';
        },
        BINARY: function(){
            return 'binary';
        },
        STRING: function(len){
            return 'string'+ (len ? '('+len+')' : '');
        },
        CHAR: function(len){
          return 'string'+ (len ? '('+len+')' : '');
        },
    }, Sequelize);

    models.forEach(function(model) {
        var modelDef = modelAttribs[model.name][0];

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

        model._JSONSchema = {
            type: "object",
            title: model.name,
            properties: properties,
            required : required
        };
    });
};