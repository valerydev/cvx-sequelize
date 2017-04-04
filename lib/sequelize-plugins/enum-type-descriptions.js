module.exports = function(sequelize) {

  var _ = sequelize.Utils._;

  sequelize.constructor.ENUM = _.wrap(sequelize.constructor.ENUM, function(ENUM, ...args){
    if(_.every(args, (arg)=> Array.isArray(arg))) {
      let type = ENUM({ values: _.map(args, (arg)=> arg[0]) })
      type.options.descriptions = args
      return type
    }
    return ENUM(...args)
  })

}