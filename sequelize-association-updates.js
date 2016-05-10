module.exports = function(sequelize){

  var _       = sequelize.Utils._;
  var Promise = sequelize.Promise;

  _.extend(sequelize.Instance.prototype, {
    updateAssoc: function (opts) {

      if(!opts.values) return null;

      var self   = this;
      var source = this.Model;
      var target = opts.model;
      var alias  = opts.as;
      var data   = _.flatten([opts.values]);
      var tap    = opts.tap;

      var _markOperation = function (values) {
        var op = 'C';
        if (_.isNumber(values)) {
          op = 'A';
          values = {id: values};
        } else if (values.id) {
          op = _.isEmpty(_.omit(values, 'id')) ? 'D' : 'U';
        }
        values._op = op;
        return values;
      };

      var _doOperation = function (association, sourceInstance, targetInstance) {

        var associationType = association.associationType;
        var accessors = association.accessors;

        var target = targetInstance.Model;
        var source = sourceInstance.Model;

        //if (associationType == 'BelongsToMany') {
        //  throw new Error('La operacion belongToMany no esta implementada por los momentos');
        //}

        switch (targetInstance._op) {
          case 'C':
            return new Promise(function (resolve) {
              resolve(targetInstance.save().then(function(){
                sourceInstance[accessors['set']](targetInstance);
              }));
            });
          case 'U':
            return new Promise(function (resolve) {
              resolve(
                target.findById(targetInstance.id).then(function (found) {
                  if(!found) {
                    throw new Error('Instance of ' + target.name +
                      ' with id ' + targetInstance.id + 'not found');
                  }
                  return found.update(targetInstance.dataValues);
                })
              );
            });
          case 'D':
            return new Promise(function (resolve) {
              resolve(targetInstance.destroy());
            });
          case 'A':
            return new Promise(function (resolve) {
              resolve(targetInstance[accessors['set']](targetInstance.id));
            });
        }
      };

      var association = source.getAssociation(target, alias);
      if (!association)
        throw new Error('No existe la asociacion entre ' + source.name + ' y ' + target.name +
          (alias ? (' bajo el alias ' + alias) : ''));

      if(['HasMany','BelongsToMany'].indexOf(association.associationType) >= 0) {
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
        var targetInstance = _.isNumber(values) ? values : target.build(values);
        _markOperation(values);
        targetInstance._op = values._op;

        if (tap !== undefined && _.isFunction(tap)) {
          tap(targetInstance);
        }

        return _doOperation(association, self, targetInstance);
      });
    }
  })
};

