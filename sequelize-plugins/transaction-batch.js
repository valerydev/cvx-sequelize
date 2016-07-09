module.exports = function(sequelize, cb){

  var _  = sequelize.Sequelize.Utils._;

  function hookTemplate(hookFunc) {

    return _.wrap(hookFunc||function(){}, function(wrappedFunc){
      //CLS debe estar activado en sequelize
      if(sequelize.constructor.cls) {

        var instance = arguments[1];
        var opts     = arguments[2];

        var currTx = sequelize.constructor.cls.active.transaction;

        //Interceptamos (envolvemos) commit y rollback solo la primera vez
        if(currTx && !currTx.commit.$wrapped) {
          currTx.commit = _.wrap(currTx.commit, function( commit ){
            return Promise.resolve(cb(currTx.batch)).then(function(){
              return commit.apply(currTx);
            });
          });
          currTx.commit.$wrapped   = true;
        }

        if( hookFunc && instance.Model.options.transactionLog ) {

          //Solo atributos existentes en BD (no virtuales)
          var attributes = _.values(instance.rawAttributes).filter(attr => !attr.type.toString().startsWith('VIRTUAL'));
          attributes = _.map(attributes, 'fieldName');

          var data = wrappedFunc.call(null, instance, attributes);
          if(!data) return;

          data.instance = instance;

          if(!currTx) {
            //Si no esta en una transaccion entonces disparar el callback
            return cb([data]);
          } else {
            //Si esta en transaccion acumular el resultado de la operacion
            currTx.batch = currTx.batch || [];
            currTx.batch.push(data);
          }
        }
      }
    });
  }

  //Interceptamos (envolvemos) commit y rollback solo una vez en
  //la primera operacion de la transaccion
  sequelize.addHook( 'beforeCreate' , hookTemplate());
  sequelize.addHook( 'beforeUpdate' , hookTemplate());
  sequelize.addHook( 'beforeDestroy', hookTemplate());

  sequelize.addHook( 'afterCreate', hookTemplate( function(instance, attributes) {
    return  {
      op: 'C',
      data: _.pick(instance.get(), attributes)
    }
  }));

  sequelize.addHook( 'afterUpdate', hookTemplate( function(instance, attributes){
    //Solo los atributos que cambiaron y el ID
    attributes = _.intersection(attributes, instance.changed());
    //Ignorar si no hay atributos con cambios
    if(_.isEmpty(attributes)) return;

    return  {
      op: 'U',
      data: _.pick(instance.get(), attributes.concat(instance.Model.primaryKeyAttributes))
    }
  }));

  sequelize.addHook( 'afterDestroy', hookTemplate(  function(instance, attributes) {
    return  {
      op: 'D',
      data: instance.get( instance.Model.primaryKeyAttribute )
    }
  }));

};
