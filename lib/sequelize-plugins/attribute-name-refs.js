module.exports = function(sequelize) {

  var _ = sequelize.Sequelize.Utils._;

  //En scopes de asociacion queremos usar nombres de atributos de modelo y no de columnas
  //de BD. Sequelize no soporta esto, asi que mapeamos nombres de atributo por nombres de campo
  //cuando se define la asociacion, para que sequelize no se queje.
  var associationWrapper = function(assocFunc, target, opts) {
    if (opts.scope) {
      opts.scope = _.object(_.pairs(opts.scope).map(function (fieldName) {
        var attrib = _.find(owner.attributes, {fieldName: fieldName[0]});
        fieldName[0] = attrib ? attrib.field : fieldName[0];
        return fieldName
      }));
    }
  };

  sequelize.Model.hasOne        = _.wrap( sequelize.Model.hasOne,    associationWrapper );
  sequelize.Model.hasMany       = _.wrap( sequelize.Model.hasMany,   associationWrapper );
  sequelize.Model.belongsTo     = _.wrap( sequelize.Model.belongsTo, associationWrapper );
  sequelize.Model.belongsToMany = _.wrap( sequelize.Model.belongsTo, associationWrapper );

};
