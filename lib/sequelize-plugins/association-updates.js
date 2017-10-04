module.exports = function(sequelize){

  let _markOperation = module.exports._markOperation
  let _doOperation   = module.exports._doOperation

  sequelize.Instance.prototype.updateAssoc = async function (opts) {

    let _ = this.sequelize.Sequelize.Utils._
    let Promise = this.sequelize.Sequelize.Promise

    if(!opts.values) return null

    let self   = this
    let data   = _.flatten([opts.values])
    let tap    = opts.tap
    let source = this.Model
    let target = opts.model
    let alias  = opts.as
    let checkRelated  = _.defaults(opts, { checkRelated: true }).checkRelated
    let association = source.getAssociation(target, alias)

    if (!association)
      throw new Error('No existe la asociacion entre ' + source.name + ' y ' + target.name +
        (alias ? (' bajo el alias ' + alias) : ''))

    if(/Many$/.test(association.associationType)) {
      let s = association.options.name.singular
      alias = alias || s[0].toUpperCase() + s.slice(1)
    } else {
      if(data.length > 1) {
        throw new Error('Esta intentando actualizar multiples valores en una asociacion '
          + association.associationType + ' entre ' + source.name + ' y ' + target.name
          + (alias ? (' bajo el alias ' + alias) : ''))
      }
      let s = association.options.name.plural
      alias = alias || s[0].toUpperCase() + s.slice(1)
    }

    let results = []
    for(let values of data) {
      values = _markOperation(values, target.primaryKeyAttribute)
      let oper = values._op

      //Para todas las operaciones menos CREAR obtenemos la instancia objetivo
      let targetInstance
      if(/[AXUD]/.test(oper)) {

        //Al asociar no existe aun ninguna asociacion entre ambas entidades
        //asi que saltamos esta restriccion, sin embargo al desasociar pasa
        //lo contrario es necesario que exista una asociacion
        if(/[AX]/.test(oper))
          checkRelated = (oper === 'A') ? false : true

        if( checkRelated ) {
          //verificamos que ambas instancias esten asociadas usando el getter accessor

          let where = {}
          where[target.primaryKeyAttribute] = values[target.primaryKeyAttribute]

          let associatedObjects = await self[association.accessors['get']]({where: where})
          associatedObjects = _.compact(_.flatten([associatedObjects]))

          let isAssociated = !_.isEmpty(associatedObjects)
          if(!isAssociated) {
            throw new Error('No existe relacion entre ' + source.name + '('
                + self[source.primaryKeyAttribute] + ') y ' + target.name + '('
                + values[target.primaryKeyAttribute] + ')')
          } else {
            //Establecer valores en "target" si se quiere actualizar(U) o asignar(A)
            targetInstance = associatedObjects[0]
            if(/[AU]/.test(oper))
              targetInstance.set(values)
          }
        } else {
          //Ignoramos si ambas instancias estan asociadas, solo buscamos la instancia objetivo y borralo.
          targetInstance = await target.unscoped().findById(values[target.primaryKeyAttribute])
          if(!targetInstance) {

            throw new Error('No existe el objetivo de la asociacion ' + target.name + ' ('
                + values[target.primaryKeyAttribute] + ')')

          } else {
            //Establecer valores en "target" si se quiere actualizar(U) o asignar(A)
            if(/[AU]/.test(oper))
              targetInstance.set(values)
          }
        }

      }
      else {
        //En el caso CREAR inicializamos una instancia nueva
        //Y en caso de que el propietario de la relacion sea el target
        //colocamos el valor de la clave de source como clave foranea
        //para prevenir violacion de notNull
        if(association.associationType === 'HasMany')
          values[association.foreignKey] = self[source.primaryKeyAttribute]

        targetInstance = target.build(values)
      }

      //Si la asociacion es N:M guardamos los valores de la tabla de asociacion
      //temporalmente en la instancia para usarlos luego cuando ejecutemos la operacion
      if(association.associationType === 'BelongsToMany') {
        targetInstance[association.throughModel.name] =
          values[association.throughModel.name]
      }

      //Marcamos la instancia con la operacion que debemos ejecutar
      targetInstance._op = values._op

      if (tap !== undefined && _.isFunction(tap)) {
        tap(targetInstance)
      }

      let result = await _doOperation(association, self, targetInstance)
      results = [...results, result ]
    }

    return /Many$/.test(association.associationType) ? results : results[0]

  }
}

module.exports._markOperation = function (values, primaryKey) {
  let op = 'C'
  if (typeof values === 'number') {
    if(values >= 0){
      op = 'A'
      values = {[primaryKey]: values}
    }
    else {
      op = 'X'
      values = {[primaryKey]: Math.abs(values)}
    }
  } else if (values[primaryKey] !== undefined && values[primaryKey] !== null) {
    op = Object.keys(values).length === 1 ? 'D' : 'U'
  }
  values._op = op
  return values
}

module.exports._doOperation = function (association, sourceInstance, targetInstance) {

  let associationType = association.associationType
  let accessors = association.accessors

  let target  = targetInstance.Model,
    source  = sourceInstance.Model,
    owner, throughValues, throughModel

  if(associationType === 'BelongsToMany') {

    owner         = association.throughModel
    throughModel  = owner

    if(targetInstance._op === 'A') {
      //Asociar es actualizar la asociacion de source
      targetInstance._op = 'U'
      throughValues = {}
    }
    else throughValues = targetInstance[throughModel.name]

    delete targetInstance[throughModel.name]
  } else {
    owner   = /^has/i.test(associationType) ? target : source
  }

  switch (targetInstance._op) {

    //Crear
    case 'C':
      //Lamentablemente sequelize no soporta correctamente asociaciones con scope si
      //los atributos tienen nombres diferentes a los de la tabla en BD, el parche del
      //commit 7002482df3e88268f5cd56188b018c3696323a90 es un workaround que debemos
      //tomar en cuenta aqui.
      if (association.scope) {
        Object.keys(association.scope).forEach(function (field) {
          for (let attrName in association.target.attributes){
            let attr = association.target.attributes[attrName]
            //Asociamos los nombres de los atributos del scope
            //con su correspondiente ya sea en la instancia o en BD
            //y asignamos su valor al atributo de la instancia
            if(attr.field === field || attr.fieldName === field) {
              targetInstance[attr.fieldName] = association.scope[field]
              break
            }
          }
        })
      }
      return sourceInstance[accessors['create']](targetInstance.dataValues, throughValues)

    //Actualizar
    case 'U':
      return targetInstance.save().then(updated =>{
        if(associationType === 'BelongsToMany' && throughValues ) {
          //Siempre "foreignKey" debe ser el valor de la clave de "source"
          throughValues[association.foreignKey] = sourceInstance[source.primaryKeyAttribute]

          //Es posible actualizar "otherKey" (la clave del target actual de 
          //esta asociacion), y si no esta definida tomamos como valor
          //la clave del target que queremos asociar
          if(throughValues[association.otherKey] === undefined)
            throughValues[association.otherKey] = targetInstance[target.primaryKeyAttribute]

          return throughModel.upsert(throughValues).then(()=> updated)
        }
        return updated
      })

    //Eliminar
    case 'D':
      return targetInstance.destroy().return(undefined)

    //Asociar
    case 'A':
      let accessor = /Many$/.test(associationType) ? 'add' : 'set'
      return sourceInstance[accessors[accessor]](targetInstance)
        .return(targetInstance)

    //Desasociar
    case 'X':
      if(/Many$/.test(associationType)) {
        return sourceInstance[accessors['remove']](targetInstance)
          .return(undefined)
      }
      else {
        return sourceInstance[accessors['set']](null)
          .return(undefined)
      }
  }
}


