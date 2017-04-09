let models = require('../../')({
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
})

let sequelize = models.sequelize
let Sequelize = models.Sequelize
let Promise   = Sequelize.Promise
let col     = Sequelize.col
let literal = Sequelize.literal
let fn      = Sequelize.fn
//--------------------------------------------------------------------//
//                    AREA DE EXPERIMENTOS                            //
//--------------------------------------------------------------------//
//-->
