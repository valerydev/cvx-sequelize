let EventEmitter = require('events')

module.exports = function(sequelize) {

  let _ = sequelize.Sequelize.Utils._

  //En scopes de asociacion queremos usar nombres de atributos de modelo y no de columnas
  //de BD. Sequelize no soporta esto, asi que mapeamos nombres de atributo por nombres de campo
  //cuando se define la asociacion, para que sequelize no se queje.
  let associationWrapper = function(assocFunc, target, opts) {
    if (opts.scope) {
      opts.scope = _.mapKeys(opts.scope, (val, key)=> target.attributes[key] ? target.attributes[key].field : key)
    }
    if (_.get(opts, 'through.scope')) {
      opts.through.scope = _.mapKeys(opts.through.scope, (val, key)=> {
        return opts.through.model.attributes[key] ? opts.through.model.attributes[key].field : key
      })
    }
    assocFunc.call(this, target, opts)
  }
  sequelize.Model.prototype.hasOne        = _.wrap( sequelize.Model.prototype.hasOne,    associationWrapper )
  sequelize.Model.prototype.hasMany       = _.wrap( sequelize.Model.prototype.hasMany,   associationWrapper )
  sequelize.Model.prototype.belongsToMany = _.wrap( sequelize.Model.prototype.belongsToMany, associationWrapper )

  //Al definir claves foraneas con el atributo 'references' es necesario pasar una instancia
  //del modelo (lo cual no es posible hasta que se defina antes todos los modelos),
  //o el nombre real de la tabla en BD (wacala!). Este codigo de abajo se ejecuta luego que
  //se definen todos los modelos y acepta un nombre de modelo en lugar del nombre de tabla
  //si existe un modelo con ese nombre sustituye el nombre del modelo por el nombre de la tabla
  //definida en el modelo (model.tableName)
  if(sequelize instanceof EventEmitter) {
    sequelize.on('afterDefineAll', function(models){
      for(let modelName in models) {
        let model = models[modelName]
        for(let attrName in model.rawAttributes) {
          let attr = model.rawAttributes[attrName]
          if(attr.references && typeof attr.references.model == 'string') {
            let refModel = sequelize.models[attr.references.model]
            if(refModel != undefined) {
              attr.references.model = refModel.tableName
              attr.references.key = (refModel.rawAttributes[attr.references.key]||{}).field
            }
          }
        }
      }
    })
  }
}
