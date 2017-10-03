let fs         = require('fs')
let path       = require('path')
let _          = require('underscore')
let EventEmitter = require('events')

module.exports = function(sequelize, opts) {

  sequelize.import = _.wrap(sequelize.import, function($import, logicDir, attribsDir){
    let splitted = attribsDir ? true:false

    let Sequelize = sequelize.Sequelize
    let DataTypes = sequelize.Sequelize
    
    fs.readdirSync(logicDir)
    .filter((file)=> !/^index.js/.test(file))
    .forEach((modelFile) => {
      let modelName = modelFile.slice(0, -3)
      if (modelFile.slice(-3) !== '.js') return

      if(splitted) {
        
        let modelLogic
        try {
          modelLogic = require(path.join(logicDir, modelName))(sequelize, Sequelize)
        } catch(e) {
          throw new Error('Ocurrio un problema al cargar el modelo logico: "' + modelName + '"')
        }

        let modelAttribs
        try {
          modelAttribs = require(path.join(attribsDir, modelName))(DataTypes, Sequelize)
        } catch(e) {
          throw new Error('Ocurrio un problema al cargar la definicion de atributos para el modelo: "' + modelName + '"')
        }
        
        if(! modelAttribs )
          throw new Error('No se encuentra la definicion de atributos del modelo ' + modelName)

        let baseAttribs  = modelAttribs[0]
        let baseOpts     = modelLogic  [1]
        let otherAttribs = modelLogic  [0]
        let otherOpts    = modelAttribs[1]

        Object.keys(baseAttribs).forEach(function (attrib) {
          if (otherAttribs[attrib] && otherAttribs[attrib].get) {
            baseAttribs[attrib].get = otherAttribs[attrib].get
          }
          if (otherAttribs[attrib] && otherAttribs[attrib].set) {
            baseAttribs[attrib].set = otherAttribs[attrib].set
          }
        })

        if (otherOpts) {
          if (!_.isUndefined(otherOpts.tableName)) {
            baseOpts.tableName = otherOpts.tableName
          }
          if (!_.isUndefined(otherOpts.validate)) {
            baseOpts.validate = _.defaults(baseOpts.validate, otherOpts.validate)
          }
        }

        $import.call(sequelize, modelName, function () {
          return sequelize.define(modelName, baseAttribs, baseOpts)
        })

      } else {
        let modelPath = path.join(logicDir, modelFile)
        $import.call(sequelize, modelPath)
      }
    })

    if(sequelize instanceof EventEmitter) {
      sequelize.emit('afterDefineAll', sequelize.models)
      sequelize.emit('beforeAssociate', sequelize.models)
    }

    //Ejecutamos las asociaciones de todos los modelos
    sequelize.modelManager.models.forEach(function (model) {
      if (model.associate) {
        model.associate()
      }
    })

    if(sequelize instanceof EventEmitter) {
      sequelize.emit('afterAssociate', sequelize.models)
    }
  })


  let associationWrapper = function($assocFunc, target, opts){
    let foreignKeyAttrib = null

    //Segun el tipo de relacion escojemos cual modelo representa la tabla
    //propietaria de la relacion (owner) y cual modelo representa la tabla
    //inversa de la relacion (inverse).
    let owner, inverse
    if($assocFunc._assocType.slice(0,3) == 'has') {
      //En asociaciones "has" el propietario de la relacion es el modelo "target"
      owner = target
      inverse = this
    } else if( $assocFunc._assocType === 'belongsTo' ) {
      //En asociaciones "belongsTo" el propietario de la relacion
      //es el modelo "source"
      owner = this
      inverse = target
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
      foreignKeyAttrib = _.findWhere(owner.attributes, {field: opts.foreignKey.field})

      //Validamos que el atributo references (si se definió) se corresponda con la
      //definicion en la asociacion
      if(foreignKeyAttrib) {

        if( !foreignKeyAttrib.references ){

          //console.log('Asociacion virtual detectada: No especificó referencia en definicion del atributo "' +
          //    foreignKeyAttrib.fieldName + '"' + ' del modelo "' + owner.name +
          //    '" que es clave foranea al modelo "' + this.name + '".')

        } else {

          if(_.isString(foreignKeyAttrib.references)) {
            //Note que por defecto sequelize asume que key es id.
            foreignKeyAttrib.references = {model: foreignKeyAttrib.references, key: 'id'}
          }

          if ( foreignKeyAttrib.references.model != inverse.tableName ) {

            throw new Error('El nombre de tabla ('+ inverse.tableName +') del modelo "' + inverse.name
              + '" en la asociacion: ' + this.name + ' ' + $assocFunc._assocType + ' ' + target.name + ', '
              + 'no se corresponde con el nombre definido en el atributo "' + foreignKeyAttrib.fieldName
              + '" de ' + foreignKeyAttrib.Model.name + ' (' + foreignKeyAttrib.references.model + ')')
          }

          if( !_.isUndefined(foreignKeyAttrib.references.key) &&
            foreignKeyAttrib.references.key != inverse.primaryKeyField ){

            throw new Error('El nombre de clave primaria ('+ inverse.primaryKeyField +') del modelo "'
              + inverse.name + '" en la asociacion: ' + this.name + ' ' + $assocFunc._assocType + ' '
              + target.name + ', ' + 'no se corresponde con el nombre definido en el atributo "'
              + foreignKeyAttrib.fieldName + '" de ' + foreignKeyAttrib.Model.name + ' ('
              + foreignKeyAttrib.references.key + ')')
          }
        }
      }

      //Damos precedencia a las configuraciones establecidas en los atributos
      //sobre las establecidas en las asociaciones
      if(foreignKeyAttrib) {

        opts.foreignKey.name = foreignKeyAttrib.fieldName

        if(!_.isUndefined(foreignKeyAttrib.allowNull)) {
          opts.foreignKey.allowNull    = foreignKeyAttrib.allowNull
        }
        if(!_.isUndefined(foreignKeyAttrib.defaultValue)) {
          opts.foreignKey.defaultValue = foreignKeyAttrib.defaultValue
        }
        if(!_.isUndefined(foreignKeyAttrib.unique)) {
          opts.foreignKey.unique = foreignKeyAttrib.unique
        }
        if(!_.isUndefined(foreignKeyAttrib.type)) {
          opts.foreignKey.type = foreignKeyAttrib.type
        }
        if(!_.isUndefined(foreignKeyAttrib.comment)) {
          opts.foreignKey.comment = foreignKeyAttrib.comment
        }

        //En este caso invertimos el comportamiento por defecto de sequelize de
        //dar precedencia a los valores de onUpdate y onDelete establecidos en
        //las asociaciones sobre los establecidos en los atributos que definen
        //claves foraneas.
        if(!_.isUndefined(foreignKeyAttrib.onUpdate) && opts.constraints !== false) {
          opts.onUpdate = foreignKeyAttrib.onUpdate
        }
        if(!_.isUndefined(foreignKeyAttrib.onDelete) && opts.constraints !== false) {
          opts.onDelete = foreignKeyAttrib.onDelete
        }

      }
    }

    $assocFunc.call(this, target, opts)
  }

  sequelize.Model.prototype.hasOne._assocType        = 'hasOne'
  sequelize.Model.prototype.hasMany._assocType       = 'hasMany'
  sequelize.Model.prototype.belongsTo._assocType     = 'belongsTo'
  sequelize.Model.prototype.belongsToMany._assocType = 'belongsToMany'

  sequelize.Model.prototype.hasOne        = _.wrap(sequelize.Model.prototype.hasOne,        associationWrapper)
  sequelize.Model.prototype.hasMany       = _.wrap(sequelize.Model.prototype.hasMany,       associationWrapper)
  sequelize.Model.prototype.belongsTo     = _.wrap(sequelize.Model.prototype.belongsTo,     associationWrapper)
  sequelize.Model.prototype.belongsToMany = _.wrap(sequelize.Model.prototype.belongsToMany, associationWrapper)
}
