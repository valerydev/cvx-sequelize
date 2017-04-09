module.exports = function( sequelize ) {

  let _ = sequelize.Utils._

  function assignAssociationScopeAttributes(self){

    if(!self.$options.include) return

    self.$options.include.filter(function (include) {
      return !(include.association.associationType === 'BelongsTo')
    }).map( function (include) {

      let targetInstances = _.flatten(_.compact([self.get(include.as)]))
      if (_.isEmpty(targetInstances)) return

      targetInstances.map(function (targetInstance) {
        //Lamentablemente sequelize no soporta correctamente asociaciones con scope si
        //los atributos tienen nombres diferentes a los de la tabla en BD, el parche del
        //commit 7002482df3e88268f5cd56188b018c3696323a90 es un workaround que debemos
        //tomar en cuenta aqui.
        if (include.association.scope) {
          Object.keys(include.association.scope).forEach(function (field) {
            for (let attrName in include.association.target.attributes) {
              let attr = include.association.target.attributes[attrName]
              //Asociamos los nombres de los atributos del scope
              //con su correspondiente ya sea en la instancia o en BD
              //y asignamos su valor al atributo de la instancia
              if (attr.field === field || attr.fieldName === field) {
                targetInstance[attr.fieldName] = include.association.scope[field]
                break
              }
            }
          })
        }
        assignAssociationScopeAttributes(targetInstance)
      })
    })
  }

  sequelize.addHook('beforeCreate', assignAssociationScopeAttributes)
}