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

var sequelize = models.sequelize;
var Sequelize = models.Sequelize;
var Promise   = Sequelize.Promise;
var col     = Sequelize.col;
var literal = Sequelize.literal;
var fn      = Sequelize.fn;
//--------------------------------------------------------------------//
