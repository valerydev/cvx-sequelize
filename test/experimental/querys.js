//var models = require('../../')();

var models = require('../../')({
  "user": "valerysystem",
  "password": "fHKuLJx4",
  "database": "valerydb_v21",
  "host": "192.168.1.13",
  "dialect": "mysql",
  "define":
  {
    "timestamps": false,
    "freezeTableName": true,
    "underscored": true
  }
});

//var models = require('../../')({
//    "user": "valerysystem",
//    "password": "fHKuLJx4",
//    "database": "valerydb",
//    "host": "valerywebdb.valeryweb.com",
//    "port": 3306,
//    "dialect": "mysql",
//    "charset": "UTF8",
//    "collate": "UTF8_GENERAL_CI",
//    "engine": "InnoDB",
//    "define":
//    {
//      "timestamps": false,
//      "freezeTableName": true,
//      "underscored": true,
//      "timezone": "-04:30"
//    },
//    "pool":
//    {
//      "min": 1,
//      "max": 50
//    }
//});

    "sql": {
      "_active": "development_v21",
      "_limit": 10000,
      "_debug": false,

      "development_v21": {
        "user": "valerysystem",
        "password": "fHKuLJx4",
        "database": "valerydb_v21",
        "host": "192.168.1.13",
        "dialect": "mysql",
        "define": {
          "timestamps": false,
          "freezeTableName": true,
          "underscored": true
        }
      }
    }
});

var sessionLoader = require('../../../valeryweb-ws/lib/SessionLoader');
sessionLoader.models = models;
sessionLoader.data = daos;

//models.SysCurrencyConversion.find({
//  include: [
//    { model: models.SysCurrency, as: 'currency1', attributes:[], required: true, where: { code: 'USD' } },
//    { model: models.SysCurrency, as: 'currency2', attributes:[], required: true, where: { code: 'VEF' } }
//  ]
//}).then(function(convs){
//  console.log(JSON.stringify(convs, null, 2));
//});

//models.sequelize.transaction().then(function(tx) {
//  models.LoyaltyCodeSequence.getNextCode(5)
//    .then(function (res) {
//      tx.commit();
//      console.log(res);
//    }).catch(function(err){
//      tx.rollback();
//      console.error(err);
//    });
//});

//console.log(JSON.stringify(user.disabledMenus));
//user.disabledMenus = [5,6,7,8,8];
//user.validate().then(function(errors){
//  console.log(JSON.stringify(errors));
//})

//models.Profile.findAll({
//  include: [
//    {
//      model: models.User,
//      as: 'users',
//      separate: true
//    }
//  ]
//}).then(profiles => {
//  console.log()
//})

//models.Profile.findById(9).then(function(profile){
//  return Promise.all([
//    profile.getContract({ scope: 'includeProperties', attributes: [] }).then(function(contract){
//      profile.setDataValue('contract', contract);
//    }),
//    profile.getProperties().then(function(properties){
//      profile.setDataValue('properties', properties);
//    })
//  ]).return(profile);
//}).then(profile => {
//  console.log(profile);
//})

//models.User.scope({
//  method: ['includeAllProperties', {
//      "configurableByUser"  : 'T',
//      "customConfiguration" : 'F'
//    }
//  ]
//}).findById(17).then(user => {
//  user.cascadeProperties[0].setDataValue('value', user.cascadeProperties[0].ContractProperty.value)
//  console.log();
//})

models.Profile.scope({
method: ['includeAllProperties', {
    "configurableByUser"  : 'T',
    "customConfiguration" : 'F'
}
]}).findById(9).then(profiles => {
  console.log();
})

//models.Loyalty.findAll().then(function(loyalty){
//  console.log(loyalty.toJSON())
//})

//models.User.scope('cascadingProperties').findAll().then(function(res){
//  console.log(JSON.stringify(res));
//})
var sequelize = models.sequelize;
var Sequelize = models.Sequelize;
var Promise   = Sequelize.Promise;
var col     = Sequelize.col;
var literal = Sequelize.literal;
var fn      = Sequelize.fn;


////////////////////////////////
////////////  USER  ////////////
////////////////////////////////
//models.User.addHook('beforeFind', function(options, callback) {
//  console.log('se disparo el before hook papa');
//  callback(null, {})
//
//});
//models.User.addHook('afterFind', function(a,b,c,d) {
//  console.log('se disparo el after hook papa');
//  return Sequelize.Promise.resolve();
//});
//
//models.User.scope( 'sessionInfo', 'cascadeProperties' ).findAll().then(function(res){
//  console.log('consulta exitosa');
//});

//models.User.scope( 'sessionInfo2' ).findAll().then(function(res){
//  console.log(JSON.parse(JSON.stringify(res)));
//  console.log();
//});

//models.User.findUserWithSessionInfo('ricardo.uzcategui@gmail.com').then(function(userInfo){
//  console.log(JSON.parse(JSON.stringify(userInfo)));
//});

//models.ConnectionSchedule.scope('includeDetails').findAll().then(function(details){
//  console.log(JSON.stringify(details))
//})


//sessionLoader.loadUserInfo('ricardo.uzcategui@gmail.com').then(function(user){
//  console.log(user.toJSON());
//});

//models.User.findAll().then(function(users){
//  users.map(function(user){
//    return user.loadCRUDInfo().then(function(){
//      return user.get({plain: true})
//    });
//  });
//  return Promise.all();
//}).then(function(users){
//  console.log(JSON.stringify(users));
//});


//models.User.findAll({include: [{model: models.Image, as: 'photo'}]}).then(function(user){
//  console.log(user)
//})




//initDataLoader.loadUserInfo('ricardo.uzcategui@gmail.com').then(function(user){
//  console.log(JSON.stringify(user.get({plain: true})));
//});


//daos.sql.UserPropertyDAO.getAllByUserCascadeProfileAndContract(16, 9, 1 )
//daos.sql.UserDAO.getByEmailComplete('%' )