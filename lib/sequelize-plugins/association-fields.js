module.exports = function(sequelize){

  var _ = sequelize.Utils._;

  var injectGetterWrapper = function($injectGetter, instancePrototype){
    var association = this;
    $injectGetter.call(association, instancePrototype);
    instancePrototype[association.accessors.get] =
      _.wrap(instancePrototype[association.accessors.get], function($getAssociation, options){
        var instance = this;

        return $getAssociation.call(instance, options)
          .then(function(data){
            var attribName = association.as;
            if(!Object.hasOwnProperty(instance, attribName)) {
              Object.defineProperty(instance, attribName, {
                configurable: true,
                get: function () {
                  return instance.getDataValue(attribName);
                },
                set: function (value) {
                  return instance.setDataValue(attribName, value);
                }
              });
            }
            instance.setDataValue(attribName, data);
            return data;
          });
      });
    return this;
  };

  var injectCreatorWrapper = function($injectCreator, instancePrototype){
    var association = this;
    $injectCreator.call(association, instancePrototype);
    instancePrototype[association.accessors.create] =
      _.wrap(instancePrototype[association.accessors.create], function($createAssociation, values, options){
        var instance = this;

        return $createAssociation.call(instance, values, options)
          .then(function(data){
            var attribName = association.as;
            if(!Object.hasOwnProperty(instance, attribName)) {
              Object.defineProperty(instance, attribName, {
                configurable: true,
                get: function () {
                  return instance.getDataValue(attribName);
                },
                set: function (value) {
                  return instance.setDataValue(attribName, value);
                }
              });
            }
            instance.setDataValue(attribName, data);
            return data;
          });
      });
    return this;
  };

  sequelize.Association.BelongsTo.prototype.injectGetter =
    _.wrap(sequelize.Association.BelongsTo.prototype.injectGetter, injectGetterWrapper);
  sequelize.Association.HasOne.prototype.injectGetter =
    _.wrap(sequelize.Association.HasOne.prototype.injectGetter, injectGetterWrapper);
  sequelize.Association.HasMany.prototype.injectGetter =
    _.wrap(sequelize.Association.HasMany.prototype.injectGetter, injectGetterWrapper);
  sequelize.Association.BelongsToMany.prototype.injectGetter =
    _.wrap(sequelize.Association.BelongsToMany.prototype.injectGetter, injectGetterWrapper);

  sequelize.Association.BelongsTo.prototype.injectCreator =
    _.wrap(sequelize.Association.BelongsTo.prototype.injectCreator, injectCreatorWrapper);
  sequelize.Association.HasOne.prototype.injectCreator =
    _.wrap(sequelize.Association.HasOne.prototype.injectCreator, injectCreatorWrapper);
  sequelize.Association.HasMany.prototype.injectCreator =
    _.wrap(sequelize.Association.HasMany.prototype.injectCreator, injectCreatorWrapper);
  sequelize.Association.BelongsToMany.prototype.injectCreator =
    _.wrap(sequelize.Association.BelongsToMany.prototype.injectCreator, injectCreatorWrapper);
};
