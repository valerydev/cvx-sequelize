module.exports = function(sequelize){

  //Ojo: El orden de instalacion importa para algunos plugins
  require('./sequelize-events'       )(sequelize);
  require('./model-loader'           )(sequelize);
  require('./attribute-name-refs'    )(sequelize);
  require('./ssacl-attribute-roles'  )(sequelize);
  require('./association-fields'     )(sequelize);
  require('./association-updates'    )(sequelize);
  require('./default-scope-functions')(sequelize);
  require('./sequelize-schema'       )(sequelize);
  require('./blob2sql'               )(sequelize);
  require('./transaction-batch'      )(sequelize);
  require('./custom-validations'     )(sequelize);
  require('./nested-creation-association-scopes')(sequelize);

};