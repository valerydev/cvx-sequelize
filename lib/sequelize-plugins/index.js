module.exports = function(sequelize){

  //Ojo: El orden de instalacion importa para algunos plugins
  require('./enum-type-descriptions' )(sequelize)
  require('./promise-shimmer'        )(sequelize)
  require('./sequelize-events'       )(sequelize)
  require('./association-fields'     )(sequelize)
  require('./association-updates'    )(sequelize)
  require('./attribute-name-refs'    )(sequelize)
  require('./model-loader'           )(sequelize)
  require('./model-registry-utils'   )(sequelize)
  require('./ssacl-attribute-roles'  )(sequelize)
  require('./default-scope-functions')(sequelize)
  require('./sequelize-schema'       )(sequelize)
  require('./virtual-references'     )(sequelize)
  require('./blob2sql'               )(sequelize)
  require('./transaction-log'        )(sequelize)
  require('./custom-validations'     )(sequelize)
  require('./nested-creation-association-scopes')(sequelize)

}