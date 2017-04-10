module.exports = function( sequelize ) {

  let _ = sequelize.Utils._

  Object.defineProperty(sequelize, 'definitions', {
    get: function(){
      let definitions = {}
      for(let modelName in sequelize.models){
        let model = sequelize.models[modelName]
        definitions[modelName] = model.definition
      }
      return definitions
    }
  })

  sequelize.addHook('afterDefine', function(model) {

    Object.defineProperty(model, 'definition', {
      get: function() {
        if(!this.__definition__) {
          let modelDef = { attributes: {} }

          _.values(model.rawAttributes).forEach( attr => {

            let type = attr.type
            let typeName = attr.type.key
            typeName = typeName.replace(/DOUBLE PRECISION/, 'DOUBLE')

            switch (typeName) {
              case 'INTEGER':
              case 'BIGINT':
              case 'BLOB':
                typeName += type._length >= 0 ? '(' + type._length + ')' : ''
                break

              case 'DOUBLE':
              case 'FLOAT':
              case 'REAL':
                if (type._length >= 0) {
                  typeName += '(' + type._length
                  typeName += type._decimals > 0 ? ',' + type._decimals : ''
                  typeName += ')'
                }
                break

              case 'DECIMAL':
                if (type._precision >= 0) {
                  typeName += '(' + type._precision
                  typeName += type._scale > 0 ? ',' + type._scale : ''
                  typeName += ')'
                }
                break

              case 'STRING':
              case 'CHAR':
              case 'DATE':
                if (type._length >= 0) {
                  typeName += '(' + type._length
                  typeName += type._binary !== undefined ? ',' + type._binary : ''
                  typeName += ')'
                }
                break

              case 'ENUM':
                break;

            }

            let attrDef = modelDef.attributes[attr.fieldName] = { type: typeName }
            if(attr.primaryKey) {
              modelDef.pk = attr.fieldName
              attrDef.primaryKey = true
            }

            attrDef.allowNull = !!attr.allowNull

            if(attr.defaultValue !== undefined)
              attrDef.defaultValue = attr.defaultValue

            if(attr.references !== undefined)
              attrDef.foreignKey = true

            let validations = attrDef.validate = (_.clone(attr.validate)||{})

            if(!attr.primaryKey) { //Esta validacion implicita no se anade para claves primarias
            //Validacion implicita no se permite vacio
            // if(attr.allowNull === false && validations.notNull === undefined)
            //   validations.notNull = true
            }

            // Validacion implicita de longitud maxima de la cadena
            //if(/^(STRING|CHAR)$/.test(attr.type.key) && attr.type._length && validations.len === undefined){
            //  validations.len = [0, attr.type._length]
            //}

            // Validacion implicita de valores de enumeracion
            //if(typeName.startsWith('ENUM')) {
            //  let values = attr.type.options.descriptions || attr.type.values
            //  validations.isIn = values.map((e)=> e[0])
            //  attrDef.values = values.map((it)=> {
            //    return {value: it[0], description: it[1]}
            //  })
            //}

            for (let vName in validations) {
              let vArgs = validations[vName]
              let vObj = {
                msg: '',
                kind: 'error'
              }

              if(_.isPlainObject(vArgs)) {
                //TODO: Evaluar riesgos de seguridad y alternativas mas seguras
                vObj.fn   = _.isFunction(vArgs.fn) ? vArgs.fn.toString() : undefined
                vObj.msg  = vArgs.msg  || ''
                vObj.kind = vArgs.kind || 'error'
              }
              else if (_.isArray(vArgs) || _.isBoolean(vArgs)){
                vObj.arg  = vArgs
              }
              else if (_.isRegExp(vArgs)) {
                //Llevamos la expresion regular a su formato en arreglo
                let regExp = vArgs.source
                let mods = vArgs.global ? 'g' : '' + vArgs.ignoreCase ? 'i' : '' + vArgs.multiline ? 'm' : ''
                vObj.arg = [regExp, mods]
              }
              else if (_.isFunction(vArgs)) {
                //Enviamos la implementacion de funcion para evaluar en el front
                //TODO: Evaluar riesgos de seguridad y alternativas mas seguras
                vObj.fn = vArgs.toString()
              }
              validations[vName] = vObj
            }
          })

          if(model.options.validate && !_.isEmpty(_.keys(model.options.validate))) {
            modelDef.postValidate = _.clone(model.options.validate)
            for( let vName in modelDef.postValidate ) {
              let func = modelDef.postValidate[vName]
              if (_.isFunction(func)) {
                //Enviamos la implementacion de funcion para evaluar en el front
                //TODO: Evaluar si esto es un problema de seguridad
                modelDef.postValidate[vName] = func.toString()
              }
            }
          }

          if(!_.isEmpty(model.associations)) {
            modelDef.associations = _.fromPairs(
              _.values(model.associations).map(assoc => {
                return [assoc.as, {
                  model      : assoc.target.name,
                  foreignKey : assoc.foreignKey,
                  otherKey   : assoc.otherKey,
                  kind       : assoc.associationType,
                  allowNull  : !!assoc.foreignKeyAttribute.allowNull,
                  through    : _.get(assoc, 'through.model.name'),
                  scope      : assoc.scope
                }]
              })
            )
          }
          this.__definition__ = modelDef
        }
        return this.__definition__
      }
    })
  })
}