let fs        = require('fs')
let Sequelize = require('sequelize')
let _         = Sequelize.Utils._
let Promise   = Sequelize.Promise

global.Promise = Sequelize.Promise

fs.readdirSync(__dirname).filter((file)=> !/index.js/.test(file)).forEach((file)=> {
  let testModelFactory = require(__dirname + '/' + file)
  module.exports['create' + _.upperFirst(file.replace(/\.js/, '').replace(/TestModel$/, '')) + 'TestModel'] = function(plugins) {
    let sq = new Sequelize(null, null, null, {
      dialect: 'sqlite',
      define: { timestamps: false, freezeTableName: true },
      logging: null//console.log
    })
    for(let plugin of plugins) plugin(sq)
    let models = testModelFactory(sq, Sequelize)
    models.sequelize = sq
    models.sync = function (...args){
      return sq.sync(...args)
    }
    return models
  }
})

