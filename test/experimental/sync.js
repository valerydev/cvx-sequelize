var models = require('../../')({
  "user": null,
  "password": null,
  "database": "valerydb-test",
  "storage": "./valerydb-test.sqlite",
  "dialect": "sqlite",
  "define":
  {
    "timestamps": false,
    "freezeTableName": true,
    "underscored": true
  }
});

models.sync({logging: true}).then(function(){
  console.log('Base de datos creada');
});
