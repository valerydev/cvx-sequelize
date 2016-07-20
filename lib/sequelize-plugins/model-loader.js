var fs         = require('fs');
var path       = require('path');
var _          = require('underscore');
var EventEmitter = require('events');

module.exports = function(sequelize, opts) {

  sequelize.import = _.wrap(sequelize.import, function($import, modelsPath, opts){
    opts = opts||{};
    if(_.isObject(modelsPath)) {
      opts = modelsPath;
      modelsPath = opts.logic;
    }
    if(!modelsPath) throw new Error('Debe especificarse una ruta al directorio de modelos');
    opts.logic = modelsPath;
    opts.attribs = opts.attribs || path.join(opts.logic, 'attribs');
    opts.splitted = opts.splitted||false;

    var Sequelize = sequelize.Sequelize;
    var DataTypes = sequelize.Sequelize;
    var modelAttribs = require(opts.attribs)(Sequelize, DataTypes);

    fs.readdirSync(opts.logic)
    // .filter(function (file) {
    //   return (file.indexOf('.') !== 0) && (file !== basename);
    // })
    .forEach( modelFile => {
      var modelName = modelFile.slice(0, -3);
      if (modelFile.slice(-3) !== '.js') return;

      if(opts.splitted) {
        var modelOpts = require(path.join(opts.logic, modelFile))(sequelize, Sequelize);

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

        $import.call(sequelize, modelName, function () {
          return sequelize.define(modelName, baseAttribs, baseOpts);
        });

      } else {
        $import.call(sequelize, modelName, modelFile);
      }
    });

    //Ejecutamos las asociaciones de todos los modelos
    sequelize.modelManager.models.forEach(function (model) {
      if (model.associate) {
        model.associate();
      }
    });


    if(sequelize instanceof EventEmitter) {
      sequelize.emit('afterDefineAll', sequelize.models);
    }
  });


  var associationWrapper = function($assocFunc, target, opts){
    var foreignKeyAttrib = null;

    //Segun el tipo de relacion escojemos cual modelo representa la tabla
    //propietaria de la relacion (owner) y cual modelo representa la tabla
    //inversa de la relacion (inverse).
    var owner, inverse;
    if($assocFunc._assocType.slice(0,3) == 'has') {
      //En asociaciones "has" el propietario de la relacion es el modelo "target"
      owner = target;
      inverse = this;
    } else if( $assocFunc._assocType === 'belongsTo' ) {
      //En asociaciones "belongsTo" el propietario de la relacion
      //es el modelo "source"
      owner = this;
      inverse = target;
    }

    //Priorizamos la definicion de clave foranea en atributo en lugar de en asociacion
    if(opts.foreignKey && $assocFunc._assocType !== 'belongsToMany' ) {

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
              + '" en la asociacion: ' + this.name + ' ' + $assocFunc._assocType + ' ' + target.name + ', '
              + 'no se corresponde con el nombre definido en el atributo "' + foreignKeyAttrib.fieldName
              + '" de ' + foreignKeyAttrib.Model.name + ' (' + foreignKeyAttrib.references.model + ')');
          }

          if( !_.isUndefined(foreignKeyAttrib.references.key) &&
            foreignKeyAttrib.references.key != inverse.primaryKeyField ){

            throw new Error('El nombre de clave primaria ('+ inverse.primaryKeyField +') del modelo "'
              + inverse.name + '" en la asociacion: ' + this.name + ' ' + $assocFunc._assocType + ' '
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

    $assocFunc.call(this, target, opts);
  };

  sequelize.Model.prototype.hasOne._assocType        = 'hasOne';
  sequelize.Model.prototype.hasMany._assocType       = 'hasMany';
  sequelize.Model.prototype.belongsTo._assocType     = 'belongsTo';
  sequelize.Model.prototype.belongsToMany._assocType = 'belongsToMany';

  sequelize.Model.prototype.hasOne        = _.wrap(sequelize.Model.prototype.hasOne,        associationWrapper);
  sequelize.Model.prototype.hasMany       = _.wrap(sequelize.Model.prototype.hasMany,       associationWrapper);
  sequelize.Model.prototype.belongsTo     = _.wrap(sequelize.Model.prototype.belongsTo,     associationWrapper);
  //sequelize.Model.prototype.belongsToMany = _.wrap(sequelize.Model.prototype.belongsToMany, associationWrapper);
};
