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

var daos = require('../../../valeryweb-data')({

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

var initDataLoader = require('../../../valeryweb-ws/lib/InitDataLoader');
initDataLoader.models = models;
initDataLoader.data = daos;

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


//models.Loyalty.findAll().then(function(loyalty){
//  console.log(loyalty.toJSON())
//})

//models.User.scope('cascadingProperties').findAll().then(function(res){
//  console.log(JSON.stringify(res));
//})
var sequelize = models.sequelize;
var Sequelize = models.Sequelize;
var col     = Sequelize.col;
var literal = Sequelize.literal;
var fn      = Sequelize.fn;

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
//models.User.scope( 'sessionInfo', 'cascadingProperties' ).findAll().then(function(res){
//  console.log('consulta exitosa');
//});

//models.User.scope( 'sessionInfo2' ).findAll().then(function(res){
//  console.log(JSON.parse(JSON.stringify(res)));
//  console.log();
//});

models.User.findUserWithSessionInfo('ricardo.uzcategui@gmail.com').then(function(userInfo){
  console.log(JSON.parse(JSON.stringify(userInfo)));
});


//initDataLoader.loadUserInfo('ricardo.uzcategui@gmail.com').then(function(user){
//  console.log(user.toJSON());
//});

//models.User.findAll({include: [{model: models.Image, as: 'photo'}]}).then(function(user){
//  console.log(user)
//})

//models.User.findAll({
//  include: [
//    {
//      model: models.Property,
//      as: 'properties',
//      required: false,
//      attributes: ['id', 'code', 'name'],
//      include: [
//        {
//          model: models.PropertyCategory,
//          as: 'category',
//          required: false,
//          attributes: ['id','name']
//        }
//      ]
//    },
//    {
//      model: models.Contract,
//      as: 'contract',
//      require: true,
//      include: [
//        {
//          model: models.Property,
//          as: 'properties',
//          required: true,
//          attributes: [ 'id', 'code', 'name'],
//          include: [
//            {
//              model: models.PropertyCategory,
//              as: 'category',
//              required: true,
//              attributes: ['id', 'name']
//            }
//          ]
//        }
//      ]
//    },
//    {
//      model: models.Profile,
//      as: 'profile',
//      required: true,
//      include: [
//        {
//          model: models.Property,
//          as: 'properties',
//          required: false,
//          attributes: ['id', 'code', 'name'],
//          include: [
//            {
//              model: models.PropertyCategory,
//              as: 'category',
//              required: false,
//              attributes: ['id', 'name']
//            }
//          ]
//        }
//      ]
//    }
//  ]
//}).then(function(user){
//  console.log(user.toJSON());
//})



//daos.sql.UserPropertyDAO.getAllByUserCascadeProfileAndContract(16, 9, 1 )
//daos.sql.UserDAO.getByEmailComplete('%' )