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

models.SysCurrencyConversion.find({
  include: [
    { model: models.SysCurrency, as: 'currency1', attributes:[], required: true, where: { code: 'USD' } },
    { model: models.SysCurrency, as: 'currency2', attributes:[], required: true, where: { code: 'VEF' } }
  ]
}).then(function(convs){
  console.log(JSON.stringify(convs, null, 2));
});