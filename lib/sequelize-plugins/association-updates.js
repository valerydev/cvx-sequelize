module.exports = function(sequelize){

  var _markOperation = module.exports._markOperation;
  var _doOperation   = module.exports._doOperation;

  sequelize.Instance.prototype.updateAssoc = function (opts) {

    var _ = this.sequelize.Sequelize.Utils._;
    var Promise = this.sequelize.Sequelize.Promise;

    if(!opts.values) return null;

    var self   = this;
    var data   = _.flatten([opts.values]);
    var tap    = opts.tap;
    var source = this.Model;
    var target = opts.model;
    var alias  = opts.as;
    var checkRelated  = _.defaults(opts, { checkRelated: true }).checkRelated;
    var association = source.getAssociation(target, alias);

    if (!association)
      throw new Error('No existe la asociacion entre ' + source.name + ' y ' + target.name +
        (alias ? (' bajo el alias ' + alias) : ''));

    if(/Many$/.test(association.associationType)) {
      var s = association.options.name.singular;
      alias = alias || s[0].toUpperCase() + s.slice(1);
    } else {
      if(data.length > 1) {
        throw new Error('Esta intentando actualizar multiples valores en una asociacion '
          + association.associationType + ' entre ' + source.name + ' y ' + target.name
          + (alias ? (' bajo el alias ' + alias) : ''));
      }
      var s = association.options.name.plural;
      alias = alias || s[0].toUpperCase() + s.slice(1);
    }

    return Promise.mapSeries(data, function(values){
      _markOperation(values);

      var oper = values._op;

      return new Promise((resolve, reject) => {

        //En todos los casos menos CREAR verificamos que exista en DB el objetivo
        if(/[AUD]/.test(oper)) {

          if( checkRelated ) {

            //...verificamos adicionalmente si existe la relacion entre ambas instancias
            //(importante en relaciones M:N)
            var where = {};
            where[target.primaryKeyAttribute] = values[target.primaryKeyAttribute];

            return self[association.accessors['get']]({where: where}).then(associatedObjects => {
              associatedObjects = _.compact(_.flatten([associatedObjects]));

              var isAssociated = !_.isEmpty(associatedObjects);
              if(!isAssociated) {
                reject(
                  new Error('No existe relacion entre ' + source.name + '('
                    + self[source.primaryKeyAttribute] + ') y ' + target.name + '('
                    + values[target.primaryKeyAttribute] + ')')
                );
              } else {
                var targetInstance = associatedObjects[0].set(values);
                resolve(targetInstance);
              }
            });
          } else {
            //Nos saltamos la verificacion de que exista la relacion entre las instancias
            //en relaciones M:N
            target.findById(values[target.primaryKeyAttribute]).then( targetInstance => {
              //Siempre verificamos que exista la instancia objetivo
              if(!targetInstance) {

                reject(
                  new Error('No existe el objetivo de la asociacion ' + target.name + ' ('
                    + values[target.primaryKeyAttribute] + ')')
                );

              } else {
                targetInstance.set(values);
                resolve(targetInstance);
              }
            });
          }

        } else {
          //En el caso CREAR inicializamos una instancia nueva
          //Y en caso de que el propietario de la relacion sea el target
          //colocamos el valor de la clave de source como clave foranea en target
          //para prevenir violacion de notNull en la clave foranea
          if(/Many$/.test(association.associationType))
            values[association.foreignKey] = self[source.primaryKeyAttribute];

          resolve(target.build(values));
        }

      }).then( targetInstance => {

        //Si la asociacion es N:M mantenemos el valor
        if(association.associationType == 'BelongsToMany') {
          targetInstance[association.throughModel.name] =
            values[association.throughModel.name];
        }

        targetInstance._op = values._op;

        if (tap !== undefined && _.isFunction(tap)) {
          tap(targetInstance);
        }

        return _doOperation(association, self, targetInstance);
      });
    }).then(results => {
      return /Many$/.test(association.associationType) ? results : results[0]
    });
  }
};

module.exports._markOperation = function (values) {
  var op = 'C';
  if (typeof values === 'number') {
    op = 'A';
    values = {id: values};
  } else if (values.id) {
    op = Object.keys(values).length === 1 ? 'D' : 'U';
  }
  values._op = op;
  return values;
};

module.exports._doOperation = function (association, sourceInstance, targetInstance) {

  var associationType = association.associationType;
  var accessors = association.accessors;

  var target  = targetInstance.Model,
    source  = sourceInstance.Model,
    owner, throughValues, throughModel;

  if(associationType === 'BelongsToMany') {
    owner         = association.throughModel;
    throughModel  = owner;
    throughValues = targetInstance[throughModel.name];
    delete targetInstance[throughModel.name];
  } else {
    owner   = /^has/i.test(associationType) ? target : source;
  }

  switch (targetInstance._op) {

    case 'C':
      //Lamentablemente sequelize no soporta correctamente asociaciones con scope si
      //los atributos tienen nombres diferentes a los de la tabla en BD, el parche del
      //commit 7002482df3e88268f5cd56188b018c3696323a90 es un workaround que debemos
      //tomar en cuenta aqui.
      if (association.scope) {
        Object.keys(association.scope).forEach(function (field) {
          for (var attrName in association.target.attributes){
            var attr = association.target.attributes[attrName];
            //Asociamos los nombres de los atributos del scope
            //con su correspondiente ya sea en la instancia o en BD
            //y asignamos su valor al atributo de la instancia
            if(attr.field === field || attr.fieldName === field) {
              targetInstance[attr.fieldName] = association.scope[field];
              break;
            }
          }
        });
      }
      return sourceInstance[accessors['create']](targetInstance.dataValues, throughValues);

    case 'U':
      return targetInstance.save().then(updated =>{
        if(associationType === 'BelongsToMany' && throughValues ) {

          throughValues[association.foreignKey] = sourceInstance.id;
          throughValues[association.otherKey  ] = targetInstance.id;

          return throughModel.upsert(throughValues).then((created)=> {
            return updated
          });
        }
        return updated;
      });

    case 'D':
      return targetInstance.destroy().return(undefined);

    case 'A':
      return targetInstance[accessors['set']](targetInstance[target.primaryKeyAttribute])
        .return(targetInstance);
  }
};


