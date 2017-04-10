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

            if(attr.allowNull === false && validations.notNull === undefined)
              validations.notNull = true

            if(/^(STRING|CHAR)$/.test(attr.type.key) && attr.type._length && validations.len === undefined){
              validations.len = [0, attr.type._length]
            }

            if(typeName.startsWith('ENUM')) {
              let values = attr.type.options.descriptions || attr.type.values
              validations.isIn = values.map((e)=> e[0])
              attrDef.values = values.map((it)=> {
                return {value: it[0], description: it[1]}
              })
            }

            for (let vName in validations) {
              let vArgs = validations[vName]
              let vObj = {
                arg: vArgs,
                msg: '',
                kind: 'error'
              }

              if(_.isObject(vArgs) && !_.isUndefined(vArgs.arg)) {
                vObj.arg = vArgs.arg
                vObj.msg  = vArgs.msg||''
                vObj.kind = vArgs.kind||'error'
              }

              if (_.isRegExp(vArgs)) {
                //Llevamos la expresion regular a su formato en arreglo
                let regExp = vArgs.source
                let mods = vArgs.global ? 'g' : '' + vArgs.ignoreCase ? 'i' : '' + vArgs.multiline ? 'm' : ''
                vObj.arg = [regExp, mods]

              } else if (_.isFunction(vArgs)) {
                //Enviamos la implementacion de funcion para evaluar en el front
                //TODO: Evaluar si esto es un problema de seguridad
                vObj.arg = 'var __evalfunc' + (''+Math.random()).slice(2) + '__=' + vArgs.toString()
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
                modelDef.postValidate[vName] = 'var __evalfunc' + (''+Math.random()).slice(2) + '__=' + func.toString()
              }
            }
          }

          if(!_.isEmpty(model.associations)) {
            modelDef.associations = _.fromPairs(
              _.values(model.associations).map(assoc => {
                return [assoc.as, {
                  model  : assoc.target.name,
                  kind   : assoc.associationType,
                  allowNull: !!assoc.foreignKeyAttribute.allowNull,
                  through: _.get(assoc, 'through.model.name')
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