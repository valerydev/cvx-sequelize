var _ = require('underscore');

module.exports = function( instance, opts ) {

  if( instance.attributes.indexOf('contractId') >= 0 && instance.contractId !== undefined ) {
    instance.contractId = this.session.user.contractId;
  }

  if( !_.intersection( ['branchId', 'classifierId1', 'classifierId2', 'classifierId3'], instance.attributes ).length === 4 ) {

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
};
