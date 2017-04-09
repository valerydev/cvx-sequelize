module.exports = function(sequelize) {

  let _ = sequelize.Sequelize.Utils._

  //En scopes de asociacion queremos usar nombres de atributos de modelo y no de columnas
  //de BD. Sequelize no soporta esto, asi que mapeamos nombres de atributo por nombres de campo
  //cuando se define la asociacion, para que sequelize no se queje.
  let associationWrapper = function(assocFunc, target, opts) {
    if (opts.scope) {
      opts.scope = _.fromPairs(_.toPairs(opts.scope).map(function (fieldName) {
        let attrib = _.find(target.attributes, {fieldName: fieldName[0]})
        fieldName[0] = attrib ? attrib.field : fieldName[0]
        return fieldName
      }))
    }
    assocFunc.call(this, target, opts)
  }
  sequelize.Model.prototype.hasOne        = _.wrap( sequelize.Model.prototype.hasOne,    associationWrapper )
  sequelize.Model.prototype.hasMany       = _.wrap( sequelize.Model.prototype.hasMany,   associationWrapper )
  sequelize.Model.prototype.belongsTo     = _.wrap( sequelize.Model.prototype.belongsTo, associationWrapper )
  //sequelize.Model.prototype.belongsToMany = _.wrap( sequelize.Model.prototype.belongsTo, associationWrapper )

}
