var cls = require('continuation-local-storage');

module.exports = function(sequelize, opts){
  var namespaces = opts.namespaces || ['global-hooks-ns'];
  var _          = sequelize.Sequelize.Utils._;

  function contextualHook(hookFunc) {
    return _.wrap(hookFunc, function(hookFunc){
      var ctx = {};
      namespaces.forEach(function(namespace) {
        ctx = _.extend(ctx, (cls.getNamespace( namespace )||{}).active);
      });

      //Incluimos el espacio de nombres de sequelize con la transaccion activa (si existe una)
      _.extend(ctx, (sequelize.Sequelize.cls||{}).active);

      hookFunc.apply(ctx, [].slice.call(arguments, 1));
    });
  }

  //sequelize.addHook( 'beforeFind', contextualHook(function( query ) {
  //  query.where.contractId = ctx.session.user.contractId;
  //}));

  sequelize.addHook( 'beforeValidate', contextualHook(function( instance, opts ) {
    opts.skip = ['contractId', 'classifierId1', 'classifierId2', 'classifierId3', 'branchId'];
  }));

  sequelize.addHook( 'beforeCreate', contextualHook(function( instance, opts ) {

    if(!this.session) return;

    if( instance.Model.attributes.contractId !== undefined ) {
      instance.contractId = this.session.user.contractId;
    }

    if( _.intersection( _.keys(instance.Model.attributes), ['branchId', 'classifierId1', 'classifierId2', 'classifierId3'] ).length === 4 ) {

      var userBranchId = this.session.user.branchId;
      var userClassifierId1 = this.session.user.classifierId1;
      var userClassifierId2 = this.session.user.classifierId2;
      var userClassifierId3 = this.session.user.classifierId3;

      instance.branchId = (userBranchId > 0) ? userBranchId : instance.branchId || 0;
      instance.classifierId1 = (userClassifierId1 > 0) ? userClassifierId1 : instance.classifierId1 || 0;
      instance.classifierId2 = (userClassifierId2 > 0) ? userClassifierId2 : instance.classifierId2 || 0;
      instance.classifierId3 = (userClassifierId3 > 0) ? userClassifierId3 : instance.classifierId3 || 0;
    }
  }));

  sequelize.addHook( 'beforeUpdate', contextualHook(function( instance, opts ) {
    if(!this.session) return;

    if( instance.Model.attributes.contractId !== undefined && instance.contractId !== undefined ) {
      instance.contractId = this.session.user.contractId;
    }

    if( _.intersection(_.keys(instance.Model.attributes), ['branchId', 'classifierId1', 'classifierId2', 'classifierId3'] ).length === 4 ) {

      var userBranchId = this.session.user.branchId;
      var userClassifierId1 = this.session.user.classifierId1;
      var userClassifierId2 = this.session.user.classifierId2;
      var userClassifierId3 = this.session.user.classifierId3;

      if(instance.branchId !== undefined)
        instance.branchId = (userBranchId > 0) ? userBranchId : instance.branchId || 0;
      if(instance.classifierId1 !== undefined)
        instance.classifierId1 = (userClassifierId1 > 0) ? userClassifierId1 : instance.classifierId1 || 0;
      if(instance.classifierId2 !== undefined)
        instance.classifierId2 = (userClassifierId2 > 0) ? userClassifierId2 : instance.classifierId2 || 0;
      if(instance.classifierId3 !== undefined)
        instance.classifierId3 = (userClassifierId3 > 0) ? userClassifierId3 : instance.classifierId3 || 0;
    }
  }));
};
