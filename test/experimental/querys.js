var models = require('../../')({
  "user"    : "<user>",
  "password": "<password>",
  "database": "<database>",
  "host"    : "<host>",
  "dialect" : "<dialect>",
  "define"  : {
    "timestamps"     : false,
    "freezeTableName": true,
    "underscored"    : true
  }
});

var sequelize = models.sequelize;
var Sequelize = models.Sequelize;
var Promise   = Sequelize.Promise;
var col     = Sequelize.col;
var literal = Sequelize.literal;
var fn      = Sequelize.fn;
//--------------------------------------------------------------------//
//                    AREA DE EXPERIMENTOS                            //
//--------------------------------------------------------------------//
//-->
