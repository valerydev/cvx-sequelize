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

}
